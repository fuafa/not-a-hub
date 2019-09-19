import React from 'react';
import { Tooltip } from 'antd';
import Octokit from '@octokit/rest';
import IconIssue from './components/IconIssue';
import IconPR from './components/IconPR';
import IcondMerge from './components/IconPRMerged';
import IconComments from './components/IconComments';
import { Assignee } from './shared/types';
import './ContributionItem.css'

const ContributionItem: React.SFC<Octokit.SearchIssuesAndPullRequestsResponseItemsItem> = (props) => {
  const isIssue = !props.pull_request;
  const className = props.state === 'open' ? 'state-green' : 'state-red';
  const isMerged = props.state === 'merged';
  const tooltipAvatar = `${props.user.login} ${props.assignee ? (props.assignee as unknown as Assignee).login : ''}`;
  
  return (
    <li style={{
      padding: '10px',
      margin: '0',
      display: 'flex',
    }}>
      <div style={{
        width: '20px',
        lineHeight: '2'
      }}>
        {isIssue ? <IconIssue className={className}></IconIssue> : isMerged ? <IcondMerge /> : <IconPR className={className}></IconPR>}
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
      }}>
        <div className="top" style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '5px',
        }}>

          <div style={{
            fontWeight: 600,
          }}>
            <a href={props.html_url} target='_blank' rel="noopener noreferrer">{props.title}</a>
          </div>
          <div style={{
            marginRight: 'auto',
            marginLeft: '15px'
          }}>
            {props.labels.map(label => (
              <span
                key={label.name}
                style={{
                  backgroundColor: `#${label.color}`,
                  color: '#fff',
                  marginLeft: '5px',
                  padding: '2px 4px',
                  fontSize: '12px',
                  fontWeight: 600,
                  borderRadius: '2px',
                }}
              >{label.name}</span>
            ))}
          </div>
          <div style={{ marginLeft: '40px' }}>
            <Tooltip placement='bottom' title={tooltipAvatar} mouseEnterDelay={1}>
              <img src={props.user.avatar_url + '&s=40'} alt="avatar" className='avatar' />
              {props.assignee && <img src={(props.assignee as unknown as Assignee).avatar_url + '&s=40'} alt="avatar" className='avatar' />}
            </Tooltip>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            marginLeft: '15px'
          }}>
            <IconComments></IconComments>
            <span style={{ marginLeft: '5px', fontSize: '12px' }}>{props.comments}</span>
          </div>
        </div>
        <div className="bottom" style={{
          display: 'flex'
        }}>
          <div>{props.repository_url.slice(
            props.repository_url.indexOf('repos/') + 6
          )}</div>
          <div style={{
            margin: '0 5px'
          }}>·</div>
          <div>
            {isIssue ? `You issue updated at ${new Date(props.updated_at).toDateString()}` : `Your pull request updated at ${new Date(props.updated_at).toDateString()}`}
          </div>
        </div>
      </div>
    </li>
  );
};

export default ContributionItem;