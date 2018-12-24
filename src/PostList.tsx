import React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { PostProps } from './PostWithProps'
import './PostList.css'

export interface PostListProp {
  posts: PostProps[]
  onSetTag: (newTag: string) => void
  tag: string
}
type PostListState = {
  listType: 'all' | 'hidden' | 'todo' | 'completed'
}

export default class PostList extends React.Component<
  RouteComponentProps & PostListProp,
  PostListState
> {
  readonly state: PostListState = {
    listType: 'all'
  }

  render() {
    let posts

    if (this.props.tag || this.props.tag.length !== 0) {
      posts = this.props.posts.filter(post =>
        post.tags.includes(this.props.tag)
      )
    } else {
      posts = [...this.props.posts]
    }

    if (this.state.listType === 'all') {
      posts = posts.filter(post => post.type !== 'hidden')
    } else {
      posts = posts.filter(post => post.type === this.state.listType)
    }

    return (
      <>
        <h2 className="tag-title">
          {this.props.tag && `#${this.props.tag} 话题`}
        </h2>
        <ul>
          {posts.map(post => (
            <li key={post.url}>
              <div className="post">
                <div className="post-text-wrapper">
                  <div className="post-title">
                    <Link to={`/post/${post.url}`}>
                      {post.type === 'todo' ? `[坑] ${post.title}` : post.title}
                    </Link>
                  </div>
                  <div className="post-desc">{post.desc}</div>
                  <div className="post-info-wrapper">
                    <span className="post-info">
                      <Link to="/">{post.author} </Link>
                      edited on {post.date}
                    </span>
                    <span className="post-info">|</span>
                    {post.tags.map(tab => (
                      // <a href={`#${tab}`} key={tab} className="tab post-info">#{tab}</a>
                      <Link
                        key={tab}
                        to={`${this.props.match.url}#${tab}`}
                        className="tab post-info"
                        onClick={() => this.props.onSetTag(tab)}
                      >
                        #{tab}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="post-cover">
                  {post.cover && <img src={post.cover} alt="" />}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </>
    )
  }
}
