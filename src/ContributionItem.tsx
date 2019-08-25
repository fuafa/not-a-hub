import React from 'react';
import IconIssue from './components/IconIssue';
import IconPR from './components/IconPR';
import { IssueOrPRProps } from './shared/types';
import './ContributionItem.css'

const ContributionItem: React.SFC<IssueOrPRProps> = (props) => {
  const isIssue = !!props.pull_request;
  const className = props.state === 'open' ? 'state-green' : 'state-red';
  
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
        {isIssue ? <IconIssue className={className}></IconIssue> : <IconPR className={className}></IconPR>}
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
          }}>{props.title}</div>
          {/* TODO: Tags here */}
          <div style={{
            marginRight: 'auto',
          }}></div>
          <div>
            <img src={props.user.avatar_url} alt="avatar" style={{
              width: '20px',
              height: '20px'
            }} />
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
            {isIssue ? `You opened this issue at ${props.created_at}` : `Your pull request xxx`}
          </div>
        </div>
      </div>
    </li>
  );
};

export default ContributionItem;