import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import 'highlight.js/styles/atom-one-light.css';
import './Post.css';
import { Link } from 'react-router-dom';
import ProgressBar from './components/ProgressBar';

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


const Post: React.SFC<PostProps> = props => {
  useEffect(() => {
    import('highlight.js').then(hljs => {
      document.querySelectorAll('pre code').forEach(block => {
        hljs.highlightBlock(block);
      });
    });
  });

  return (
    <>
      <ProgressBar />
      <h1>{props.title}</h1>
      <div className="mata">
        <span>
          <Link to="/" className="mata-link">
            {props.author}
          </Link>
        </span>
        <span>|</span>
        <span>{props.date}</span>
        <span>|</span>
        {props.tags.map(tag => (
          <span key={tag}>
            <Link
              to={`/tag/${tag}`}
              className="mata-link"
            >
              #{tag}
            </Link>
          </span>
        ))}
      </div>
      <blockquote>
        <p>{props.desc}</p>
      </blockquote>
      <ReactMarkdown source={props.content} />
    </>
  );
}

export default Post;
