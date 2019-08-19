import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Tag, Typography, Divider, Pagination } from 'antd';
// import usePager from './hooks/usePager';
// import usePrevious from './hooks/usePrevious';
import { PostProps } from './Post';
import './PostList.css';
import { camel2dash } from './utils/utils';

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

export interface PostListProp {
  posts: PostProps[];
  // 测试用
  color?: typeof COLORS[number]
};
type ListType = 'all' | 'hidden' | 'todo' | 'completed';
type PostsRouterParam = {
  tag?: string;
  page?: string;
};


const PER_PAGE = 5;
const { Title, Paragraph } = Typography;

const PostList: React.SFC<RouteComponentProps<PostsRouterParam> & PostListProp> = props => {
  let posts;
  const [listType] = useState<ListType>('all');
  const tag = props.match.params.tag;
  const page = props.match.params.page;
  // 渲染两次
  // console.log('haha', props.match.params);
  const [currentPage, setPage] = useState(Number(page) || 1);
  // const prevPage = usePrevious(currentPage);

  useEffect(() => {
    // if (prevPage === Number(page)) {
    //   return;
    // }
    setPage(Number(page) || 1);
    // React Hook useEffect has a missing dependency: 'props'.
    // Either include it or remove the dependency array.
    // However, 'props' will change when *any* prop changes,
    // so the preferred fix is to destructure the 'props' object outside of the useEffect call and refer to those specific props inside useEffect  react-hooks/exhaustive-deps
    // https://reactjs.org/docs/hooks-faq.html#is-it-safe-to-omit-functions-from-the-list-of-dependencies
  }, [page]);

  if (tag) {
    posts = props.posts.filter(post => post.tags
      .map(tag => tag.toLowerCase())
      .includes(tag)
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
  const start = (currentPage - 1) * PER_PAGE;
  const end = start + PER_PAGE;
  posts = posts.slice(start, end);

  return (
    <Typography>
      <h2 className="tag-title">
        {tag && (
          <Tag color={props.color || COLORS[Math.floor(Math.random() * COLORS.length)]}>
            #{tag}
          </Tag>
        )}
      </h2>
      <ul>
        {posts.map(post => (
          <li key={post.url}>
            <div className="post">
              <div className="post-text-wrapper">
                <Title className="post-title" level={3}>
                  <Link to={`/post/${camel2dash(post.url)}`}>
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
                      to={`/tag/${tag.toLowerCase()}`}
                      className="tag"
                      // onClick={() => setPage(1)}
                    >
                      <Tag
                        color={
                          props.color || COLORS[Math.floor(Math.random() * COLORS.length)]
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
        // Warning: State updates from the useState() and useReducer() Hooks don't support the second callback argument.
        // To execute a side effect after rendering, declare it in the component body with useEffect().
        // https://github.com/facebook/react/issues/14174
        // The unnessesary wrapped function is used for solving the above warning. From `onChange={setPage}` -> `onChange={newPage => setPage(newPage)}`
        onChange={newPage => {
          setPage(newPage);
          props.history.push(`${tag ? `/tag/${tag}/` : '/'}${newPage && newPage !== 1 ? `page/${newPage}` : ''}`);
          // window.history.pushState(null, '', `${tag ? `/tag/${tag}/` : '/'}${newPage && newPage !== 1 ? `page/${newPage}` : ''}`);
        }}
        total={total}
        pageSize={PER_PAGE}
        current={currentPage}
      />
    </Typography>
  );
};

export default PostList;
