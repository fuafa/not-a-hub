import React, { useState, useEffect, useCallback, useReducer, Reducer } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Radio, Icon, message } from 'antd';
import Octokit from '@octokit/rest';
import ContributionItem from './ContributionItem';

const octokit = new Octokit();
type FeedType = 'pr' | 'issue' | 'all';
interface FeedError {
  message: string;
  documentation_url: string;
}
const PER_PAGE = 30;

type ActionType =
    'FETCH_FEEDS'
  | 'FETCH_FAIL'
  | 'FETCH_MORE_FEEDS'
  | 'FETCH_MORE_FAIL';

type ActionTypeWithPayLoad =
    'FETCH_SUCCESS'
  | 'FETCH_MORE_SUCCESS';

type Action = {
  kind: ActionType;
} | {
  kind: ActionTypeWithPayLoad;
  payload: Octokit.SearchIssuesAndPullRequestsResponse;
};

interface State {
  loading: boolean;
  loadingMore: boolean;
  data?: Octokit.SearchIssuesAndPullRequestsResponse;
}

const reducer: Reducer<State, Action> = (preState, action) => {
  switch (action.kind) {
    case 'FETCH_FEEDS':
      return {
        ...preState,
        loading: true,
      };
    case 'FETCH_SUCCESS':
      return {
        loading: false,
        loadingMore: false,
        data: action.payload
      };
    case 'FETCH_FAIL':
      return {
        ...preState,
        loading: false,
      };
    case 'FETCH_MORE_FEEDS':
      return {
        ...preState,
        loadingMore: true,
      };
    case 'FETCH_MORE_SUCCESS':
      return {
        loadingMore: false,
        loading: false,
        data: {
          // FETCH_MORE means preState.data !== undefined, so use a ! is ok here.
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          total_count: preState.data!.total_count + action.payload.total_count,
          items: [
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            ...preState.data!.items,
            ...action.payload.items
          ].sort((a, b) => a.updated_at > b.updated_at ? -1 : 0),
          incomplete_results: action.payload.incomplete_results
        },
      };
    case 'FETCH_MORE_FAIL':
      return {
        ...preState,
        loadingMore: false,
      };
  }
};

const Contribution: React.SFC<RouteComponentProps> = () => {
  const [state, dispatch] = useReducer(reducer, {
    loading: true,
    loadingMore: false,
    data: undefined,
  });
  const [type, setType] = useState<FeedType>('all');
  const count = state.data ? state.data.items.length : 0;
  const page = count / PER_PAGE + 1;
  const hasRest = state.data ? state.data.total_count - count > 0 : true;

  /**
   * Used by bind scroll useEffect
   * TODO: 根据类型选择加载哪些内容
   */
  const getMoreData = useCallback(async (q: string) => {
    if (state.loadingMore) {
      return;
    }
    dispatch({ kind: 'FETCH_MORE_FEEDS' });
    try {
      const feeds = await octokit.search.issuesAndPullRequests({
        q,
        page
      });
      dispatch({
        kind: 'FETCH_MORE_SUCCESS',
        payload: feeds.data,
      });
    }
    catch (err) {
      dispatch({ kind: 'FETCH_MORE_FAIL' });
      message.error(err.message);
    }
  }, [state, page]);

  /**
   * Bind scroll
   */
  useEffect(() => {
    function onScroll(): void {
      if (document.documentElement.scrollHeight <= window.scrollY + document.body.clientHeight && hasRest) {
        const is = type === 'all' ? '' : `+is${type}`;
        const q = `author:fuafa${is}`;
        getMoreData(q);
      }
    }
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [getMoreData, type, hasRest]);

  /**
   * Fetch data when init and taggol type.
   */
  useEffect(() => {
    async function setFeeds() {
      let q = 'author:fuafa+-user:fuafa';
      // let q = 'author:fuafa';

      if(type !== 'all') {
        q += `+is:${type}`;
      }
      if (type !== 'issue') {
        const merged = octokit.search.issuesAndPullRequests({
          q: `${q}+is:merged`
        });
        const unMerged = octokit.search.issuesAndPullRequests({
          q: `${q}+is:unmerged`
        });
        const issue =
          type === 'all'
          ? octokit.search.issuesAndPullRequests({
            q: `${q}+is:issue`
          })
          : Promise.resolve({
            data: {
              total_count: 0,
              incomplete_results: false,
              items: []
            }
          }) as unknown as Promise<Octokit.Response<Octokit.SearchIssuesAndPullRequestsResponse>>;

        await Promise.all([
          merged,
          unMerged,
          issue
        ])
        .then(([merged, unMerged, issue]) => {
          const items = [
            ...merged.data.items.map(item => {
              return {
                ...item,
                state: 'merged'
              };
            }),
            ...unMerged.data.items,
            ...issue.data.items
          ].sort((a, b) => {
            if (a.updated_at > b.updated_at) {
              return -1;
            }
            return 0;
          });

          dispatch({
            kind: 'FETCH_SUCCESS',
            payload: {
              items,
              total_count: merged.data.total_count + unMerged.data.total_count + issue.data.total_count,
              incomplete_results: merged.data.incomplete_results && unMerged.data.incomplete_results && issue.data.incomplete_results,
            }
          });
        });

        return;
      }

      const feeds = await octokit.search.issuesAndPullRequests({
        q
      });

      dispatch({ kind: 'FETCH_SUCCESS', payload: feeds.data });
    }


    setFeeds()
      .catch((err: FeedError) => {
        dispatch({ kind: 'FETCH_FAIL' });
        if (err.documentation_url.endsWith('#rate-limiting')) {
          message.error('API rate limit exceeded');
          return;
        }
        message.error(err.message);
      });
  }, [type]);

  const LoadingCompoent = (x: boolean) => x && <Icon type="loading" spin></Icon>;

  function onChangeRadio(value: FeedType) {
    dispatch({ kind: 'FETCH_FEEDS' });
    setType(value);
  }

  return (
    <>
      <Radio.Group onChange={(e) => onChangeRadio(e.target.value)} defaultValue='all'>
        {['all', 'pr', 'issue'].map(value =>
          <Radio.Button key={value} value={value}>{value} {state.loading ? LoadingCompoent(type === value) : ''}</Radio.Button>
        )}
      </Radio.Group>
      <ul style={{
        border: '1px solid #ccc',
        padding: 0,
        width: '660px'
      }}>
        {state.data
          ? state.data.items.map(item => (
              <ContributionItem {...item} key={item.url}></ContributionItem>
          ))
          : <div style={{ padding: '50px', textAlign: 'center', fontSize: '30px' }}>
              <Icon type='loading' spin></Icon>
          </div>
        }
        {state.loadingMore && <li style={{ textAlign: 'center' }}><Icon type='loading' spin></Icon></li>}
      </ul>
    </>
  );
};

export default Contribution;
