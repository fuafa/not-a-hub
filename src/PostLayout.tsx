import React, { lazy, Suspense } from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import PostList, { PostListProp } from './PostList';
// import { PostProps } from "./PostWithProps";

type PostLayoutState = {
  tag: string;
  currentPage: number;
};
type PostLayoutProps = Pick<
  PostListProp,
  Exclude<keyof PostListProp, 'tag' | 'onSetTag' | 'currentPage' | 'onSetPage'>
>;

const Post = lazy(() => import('./PostWithProps'));

export default class PostLayout extends React.Component<
  RouteComponentProps & PostLayoutProps,
  PostLayoutState
> {
  readonly state: PostLayoutState = {
    tag: location.hash ? decodeURIComponent(location.hash).slice(1) : '',
    currentPage: Number(sessionStorage.getItem('currentPage')) || 1
  };
  setTag = (newTag: string) => {
    this.setState(state => {
      return {
        ...state,
        tag: newTag,
        currentPage: 1
      };
    });
  };

  setPage = (page: number) => {
    this.setState(state => {
      return {
        ...state,
        currentPage: page
      };
    });
  };

  componentDidUpdate() {
    console.log('wtf');
    sessionStorage.setItem('currentPage', `${this.state.currentPage}`);
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
              currentPage={this.state.currentPage}
              onSetPage={this.setPage}
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
                onSetTag={this.setTag}
              />
            </Suspense>
          )}
        />
      </>
    );
  }
}
