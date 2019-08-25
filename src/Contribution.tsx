import React, { useState, useEffect } from 'react';
import ContributionItem from './ContributionItem';
import { RouteComponentProps } from 'react-router-dom';
import Octokit from '@octokit/rest';

import { IssuesAndPRsMata } from './shared/types';


const octokit = new Octokit();

const Contribution: React.SFC<RouteComponentProps> = (props) => {
  const [data, setData] = useState<IssuesAndPRsMata | undefined>(undefined);
  useEffect(() => {
    async function setFeeds(type?: 'pr'| 'issue') {
      let q = 'author:fuafa';
      if(type) {
        q += `is:${type}`;
      }
      const feeds = await octokit.search.issuesAndPullRequests({
        q
      });
      setData(feeds.data);
    }

    setFeeds();
  }, []);

  return (
    <ul style={{
      border: '1px solid #ccc',
      padding: 0,
      width: '660px'
    }}>
      {data ? data.items.map(item => (
        <ContributionItem {...item} key={item.url}></ContributionItem>
      )) : <div>loading...</div>}
    </ul>
  );
};

export default Contribution;