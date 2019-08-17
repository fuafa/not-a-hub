import React, { lazy, Suspense, forwardRef, ForwardRefExoticComponent, useState, useEffect, useImperativeHandle } from 'react'; // eslint-disable-line
import { Route, RouteComponentProps } from 'react-router-dom';
import { Icon } from 'antd';
import PostList, { PostListProp } from './PostList';

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
                ({ url }) => url === routeProps.match.params.post_title
              )!}
            />
          </Suspense>
        )}
      />
    </>
  );
}

export default PostLayout;

// export default class PostLayout extends React.Component<
//   RouteComponentProps<RouterParams> & PostListProp
// > {
//   render() {
//     return (
//       <>
//         <Route
//           path={[this.props.match.path, `${this.props.match.path}tag/:tag`]}
//           exact
//           render={props => (
//             <PostList
//               {...props}
//               posts={this.props.posts}
//             />
//           )}
//         />
//         <Route
//           path={`/post/:post_title`}
//           render={props => (
//             <Suspense
//               fallback={
//                 <>
//                   <Icon type="loading" style={{fontSize: '50px'}}></Icon>
//                 </>
//               }
//             >
//               <Post
//                 {...props}
//                 {...this.props.posts.find(
//                   ({ url }) => url === props.match.params.post_title
//                 )!}
//               />
//             </Suspense>
//           )}
//         />
//       </>
//     );
//   }
// }
