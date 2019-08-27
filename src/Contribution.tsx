import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    async function setFeeds(type: FeedType) {
      let q = 'author:fuafa+-user:fuafa';

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


    setFeeds(type)
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
        <Radio.Button value='all'>all {loading ? LoadingCompoent(type === 'all') : ''}</Radio.Button>
        <Radio.Button value='pr'>pr {loading ? LoadingCompoent(type === 'pr') : ''}</Radio.Button>
        <Radio.Button value='issue'>issue {loading ? LoadingCompoent(type === 'issue') : ''}</Radio.Button>
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
      </ul>
    </>
  );
};

export default Contribution;