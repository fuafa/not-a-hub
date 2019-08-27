import React, { lazy, Suspense, forwardRef, ForwardRefExoticComponent, useState, useEffect, useImperativeHandle } from 'react'; // eslint-disable-line
import { Route, RouteComponentProps } from 'react-router-dom';
import { Icon } from 'antd';
import PostList, { PostListProp } from './PostList';
import { camel2dash } from './utils/utils'

import { connect } from 'react-redux';

import { iRootState, Dispatch } from './store';

const mapState = (state: iRootState) => ({
  posts: state.posts
});

type Props = ReturnType<typeof mapState>;

type RouterParams = {
  post_title: string
}

const Post = lazy(() => import('./Post'));

const PostLayout: React.SFC<RouteComponentProps<RouterParams> & PostListProp> = props => {

  return (
    <>
      <Route
        path={[props.match.path, `${props.match.path}tag/:tag`, `${props.match.path}page/:page`, `${props.match.path}tag/:tag/page/:page`]}
        exact
        render={routeProps => (
          <PostList
            {...routeProps}
            posts={props.posts}
          />
        )}
      />
      <Route
        path={`/post/:post_title`}
        render={routeProps => (
          <Suspense
            fallback={
              <>
                <Icon type="loading" style={{fontSize: '50px'}}></Icon>
              </>
            }
          >
            <Post
              {...routeProps}
              {...props.posts.find(
                ({ url }) => camel2dash(url) === routeProps.match.params.post_title
              )!}
            />
          </Suspense>
        )}
      />
    </>
  );
}

export default connect(mapState)(PostLayout);
