import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Tag, Typography, Divider, Pagination } from 'antd';
import { PostProps } from './PostWithProps';
import './PostList.css';

export interface PostListProp {
  posts: PostProps[];
  onSetTag: (newTag: string) => void;
  tag: string;
  onSetPage: (page: number) => void;
  currentPage: number;
}
type PostListState = {
  listType: 'all' | 'hidden' | 'todo' | 'completed';
  perPage: number;
};

const colors = [
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
];
const { Title, Paragraph } = Typography;

export default class PostList extends React.Component<
  RouteComponentProps & PostListProp,
  PostListState
> {
  readonly state: PostListState = {
    listType: 'all',
    perPage: 5
  };

  render() {
    let posts;

    if (this.props.tag || this.props.tag.length !== 0) {
      posts = this.props.posts.filter(post =>
        post.tags.includes(this.props.tag)
      );
    } else {
      posts = [...this.props.posts];
    }

    if (this.state.listType === 'all') {
      posts = posts.filter(post => post.type !== 'hidden');
    } else {
      posts = posts.filter(post => post.type === this.state.listType);
    }

    // page
    // 现在没什么 luan 用。。。
    const total = posts.length;
    const start = (this.props.currentPage - 1) * this.state.perPage;
    const end = start + this.state.perPage;
    posts = posts.slice(start, end);

    return (
      <Typography>
        <h2 className="tag-title">
          {this.props.tag && (
            <Tag color={colors[Math.floor(Math.random() * colors.length)]}>
              {this.props.tag} 话题
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
                        to={`${this.props.match.url}#${tag}`}
                        className="tag"
                        onClick={() => this.props.onSetTag(tag)}
                      >
                        <Tag
                          color={
                            colors[Math.floor(Math.random() * colors.length)]
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
          onChange={this.props.onSetPage}
          total={total}
          pageSize={this.state.perPage}
          current={this.props.currentPage}
        />
      </Typography>
    );
  }
}
