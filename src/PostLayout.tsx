import React, { lazy, Suspense } from 'react'
import { Route, RouteComponentProps } from 'react-router-dom'
import PostList, { PostListProp } from './PostList'
// import { PostProps } from "./PostWithProps";

type PostLayoutState = {
  tag: string
}
type PostLayoutProps = Pick<
  PostListProp,
  Exclude<keyof PostListProp, 'tag' | 'onSetTag'>
>

const Post = lazy(() => import('./PostWithProps'))

export default class PostLaout extends React.Component<
  RouteComponentProps & PostLayoutProps,
  PostLayoutState
> {
  readonly state: PostLayoutState = {
    tag: location.hash ? location.hash.slice(1) : ''
  }
  setTag = (newTag: string) => {
    this.setState({
      tag: newTag
    })
  }

  render() {
    return (
      <>
        <Route
          path={this.props.match.url}
          exact
          render={props => (
            <PostList
              {...props}
              posts={this.props.posts}
              onSetTag={this.setTag}
              tag={this.state.tag}
            />
          )}
        />
        <Route
          path="/post/:post_title"
          render={props => (
            <Suspense
              fallback={
                <>
                  <div>Loading...</div>
                </>
              }
            >
              <Post
                {...props}
                {...this.props.posts.find(
                  ({ url }) => url === props.match.params.post_title
                )!}
              />
            </Suspense>
          )}
        />
      </>
    )
  }
}
