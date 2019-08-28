import React, { useState, useEffect, useCallback } from 'react';
import ContributionItem from './ContributionItem';
import { RouteComponentProps } from 'react-router-dom';
import { Radio, Icon, message } from 'antd';
import Octokit from '@octokit/rest';

import { IssuesAndPRsMata } from './shared/types';


const octokit = new Octokit();
type FeedType = 'pr' | 'issue' | 'all';
type FeedError = {
  message: string;
  documentation_url: string;
};

const Contribution: React.SFC<RouteComponentProps> = () => {
  const [data, setData] = useState<IssuesAndPRsMata | undefined>(undefined);
  // TODO: Change to useReducer
  const [type, setType] = useState<FeedType>('all');
  const [loading, setLoading] = useState(true);


  const [loadingMore, setLoadingMore] = useState(false);
  const count = data ? data.items.length : 0;
  const page = count / 30 + 1;
  const hasRest = data ? data.total_count - count > 0 : true;

  /**
   * Used by bind scroll useEffect
   * TODO: 根据类型选择加载哪些内容
   */
  const getMoreData = useCallback(async (q: string) => {
    if (loadingMore) {
      return;
    }
    setLoadingMore(true);
    const feeds: Octokit.Response<IssuesAndPRsMata> = await octokit.search.issuesAndPullRequests({
      q,
      page
    });
    const items = [...data!.items, ...feeds.data.items.sort((a, b) => a.updated_at > b.updated_at ? -1 : 0)];
    setData({
      ...feeds.data,
      items
    });
    setLoadingMore(false);
  }, [data, page, loadingMore]);

  /**
   * Bind scroll
   */
  useEffect(() => {
    function onScroll() {
      if (document.documentElement.scrollHeight <= window.scrollY + document.body.clientHeight && hasRest) {
        console.log('fetch more');
        let is = type === 'all' ? '' : `+is${type}`;
        let q = `author:fuafa${is}`;
        getMoreData(q)
          .then(() => {
            setLoadingMore(false);
          })
          .catch((err: FeedError) => {
            message.error(err.message);
            setLoadingMore(false);
          });
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
        const merged: Promise<Octokit.Response<IssuesAndPRsMata>> = octokit.search.issuesAndPullRequests({
          q: `${q}+is:merged`
        });
        const unMerged: Promise<Octokit.Response<IssuesAndPRsMata>> = octokit.search.issuesAndPullRequests({
          q: `${q}+is:unmerged`
        });
        const issue: Promise<Octokit.Response<IssuesAndPRsMata>> =
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
          }) as unknown as Promise<Octokit.Response<IssuesAndPRsMata>>;

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
              }
            }),
            ...unMerged.data.items,
            ...issue.data.items
          ].sort((a, b) => {
            if (a.updated_at > b.updated_at) {
              return -1;
            }
            return 0;
          });

          setData({
            items,
            total_count: merged.data.total_count + unMerged.data.total_count + issue.data.total_count,
            incomplete_results: merged.data.incomplete_results && unMerged.data.incomplete_results && issue.data.incomplete_results,
          });
        })

        return;
      }

      const feeds = await octokit.search.issuesAndPullRequests({
        q
      });

      setData(feeds.data);
    }


    setFeeds()
      .then(() => {
        setLoading(false);
      })
      .catch((err: FeedError) => {
        setLoading(false);
        if (err.documentation_url.endsWith('#rate-limiting')) {
          message.error('API rate limit exceeded');
          return;
        }
        message.error(err.message);
      });
  }, [type]);

  const LoadingCompoent = (x: boolean) => x && <Icon type="loading" spin></Icon>

  function onChangeRadio(value: FeedType) {
    setLoading(true);
    setType(value);
  }

  return (
    <>
      <Radio.Group onChange={(e) => onChangeRadio(e.target.value)} defaultValue='all'>
        {/* <Radio.Button value='all'>all {loading ? LoadingCompoent(type === 'all') : ''}</Radio.Button>
        <Radio.Button value='pr'>pr {loading ? LoadingCompoent(type === 'pr') : ''}</Radio.Button>
        <Radio.Button value='issue'>issue {loading ? LoadingCompoent(type === 'issue') : ''}</Radio.Button> */}
        {['all', 'pr', 'issue'].map(value => 
          <Radio.Button value={value}>{value} {loading ? LoadingCompoent(type === value) : ''}</Radio.Button>
        )}
      </Radio.Group>
      <ul style={{
        border: '1px solid #ccc',
        padding: 0,
        width: '660px'
      }}>
        {data
          ? data.items.map(item => (
              <ContributionItem {...item} key={item.url}></ContributionItem>
          ))
          : <div style={{ padding: '50px', textAlign: 'center', fontSize: '30px' }}>
              <Icon type='loading' spin></Icon>
          </div>
        }
        {loadingMore && <li style={{ textAlign: 'center' }}><Icon type='loading' spin></Icon></li>}
      </ul>
    </>
  );
};

export default Contribution;