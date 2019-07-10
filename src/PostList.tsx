import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Tag, Typography, Divider, Pagination } from 'antd';
import { PostProps } from './Post';
import './PostList.css';

export interface PostListProp {
  posts: PostProps[];
  onSetPage: (page: number) => void;
  currentPage: number;
}
type ListType = 'all' | 'hidden' | 'todo' | 'completed';
type PostsRouterParam = {
  tag?: string
};

const COLORS = [
  'magenta',
  'red',
  'volcano',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'geekblue',
  'purple'
] as const;
const { Title, Paragraph } = Typography;

const PER_PAGE = 5;

const PostList: React.SFC<RouteComponentProps<PostsRouterParam> & PostListProp> = props => {
  let posts;
  const [listType] = useState<ListType>('all');

  const tag = props.match.params.tag;
  useEffect(() => {
    props.onSetPage(1);
    // React Hook useEffect has a missing dependency: 'props'.
    // Either include it or remove the dependency array.
    // However, 'props' will change when *any* prop changes,
    // so the preferred fix is to destructure the 'props' object outside of the useEffect call and refer to those specific props inside useEffect  react-hooks/exhaustive-deps
    // https://reactjs.org/docs/hooks-faq.html#is-it-safe-to-omit-functions-from-the-list-of-dependencies
    // eslint-disable-next-line
  }, [tag])

  if (tag) {
    posts = props.posts.filter(post =>
      post.tags.includes(tag)
    );
  } else {
    posts = [...props.posts];
  }

  if (listType === 'all') {
    posts = posts.filter(post => post.type !== 'hidden');
  } else {
    posts = posts.filter(post => post.type === listType);
  }

  // page
  // 现在没什么 luan 用。。。
  const total = posts.length;
  const start = (props.currentPage - 1) * PER_PAGE;
  const end = start + PER_PAGE;
  posts = posts.slice(start, end);

  return (
    <Typography>
      <h2 className="tag-title">
        {tag && (
          <Tag color={COLORS[Math.floor(Math.random() * COLORS.length)]}>
            {tag} 话题
          </Tag>
        )}
      </h2>
      <ul>
        {posts.map(post => (
          <li key={post.url}>
            <div className="post">
              <div className="post-text-wrapper">
                <Title className="post-title" level={3}>
                  <Link to={`/post/${post.url}`}>
                    {post.type === 'todo' ? `[坑] ${post.title}` : post.title}
                  </Link>
                </Title>
                <Paragraph className="post-desc">{post.desc}</Paragraph>
                <div className="post-info-wrapper">
                  <span className="post-info">
                    <Link to="/">{post.author} </Link>
                    edited on {post.date}
                  </span>
                  <span className="post-info">|</span>
                  {post.tags.map(tag => (
                    <Link
                      key={tag}
                      to={`/tag/${tag}`}
                      className="tag"
                      onClick={() => props.onSetPage(1)}
                    >
                      <Tag
                        color={
                          COLORS[Math.floor(Math.random() * COLORS.length)]
                        }
                      >
                        {tag}
                      </Tag>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="post-cover">
                {post.cover && <img src={post.cover} alt="" />}
              </div>
            </div>
            <Divider />
          </li>
        ))}
      </ul>
      <Pagination
        onChange={props.onSetPage}
        total={total}
        pageSize={PER_PAGE}
        current={props.currentPage}
      />
    </Typography>
  );
};

export default PostList;
