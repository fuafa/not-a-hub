import React from 'react';
import 'highlight.js/styles/atom-one-light.css';
import './Post.css';
import { Link } from 'react-router-dom';
import html2React from 'html-react-parser';
import { Divider } from 'antd';
import ProgressBar from './components/ProgressBar';
import LinkTag from './components/LinkTag';
import { ColorProp } from './shared/types';

export interface PostProps {
  content: string;
  title: string;
  url: string;
  tags: string[];
  date: string;
  author: string;
  desc: string;
  type: string;
  cover?: string;
}

const Post: React.SFC<PostProps & ColorProp> = props => {
  return (
    <>
      <ProgressBar />
      <h1>{props.title}</h1>
      <div className="mata" style={{
        marginBottom: '20px'
      }}>
        <span>
          <Link to="/" className="mata-link">
            {props.author}
          </Link>
        </span>
        <span>|</span>
        <span>{props.date}</span>
        <span>|</span>
       {props.tags.map(tag => (
          <LinkTag key={tag} tag={tag} className='meta-link' color={props._color}/>
        ))}
      </div>
      <p style={{
        fontStyle: 'italic'
      }}>{props.desc.toUpperCase()}</p>
      <Divider />
      {/* <ReactMarkdown source={props.content} /> */}
      {html2React(props.content)}
    </>
  );
};

export default Post;
