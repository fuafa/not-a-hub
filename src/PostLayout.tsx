import React, { lazy, Suspense, forwardRef, ForwardRefExoticComponent, useState, useEffect, useImperativeHandle } from 'react'; // eslint-disable-line
import { Route, RouteComponentProps } from 'react-router-dom';
import { Icon } from 'antd';
import PostList, { PostListProp } from './PostList';

type PostLayoutProps = Pick<
  PostListProp,
  Exclude<keyof PostListProp, 'currentPage' | 'onSetPage'>
>;

const Post = lazy(() => import('./Post'));

// const PostLayout = forwardRef((props: RouteComponentProps & PostLayoutProps, ref) => {
//   const [tag, setTag] = useState(location.hash ? decodeURIComponent(location.hash).slice(1) : ''); // eslint-disable-line no-restricted-globals
//   const [currentPage, setCurrentPage] = useState(Number(sessionStorage.getItem('currentPage')) || 1);

//   useEffect(() => {
//     sessionStorage.setItem('currentPage', String(currentPage));
//   });

//   useImperativeHandle(ref, () => ({
//     reSetTag: () => setTag('')
//   }));

//   const post = props.posts.find(({ url }) => url === (props.match.params as any).post_title);
//   console.log('post:', props.match);

//   return (
//     <>
//       <Route
//         path={props.match.url}
//         exact
//         render={routeProps => (
//           <PostList
//             {...routeProps}
//             posts={props.posts}
//             onSetTag={setTag}
//             tag={tag}
//             currentPage={currentPage}
//             onSetPage={setCurrentPage}
//           />
//         )}
//       />
//       <Route
//         path="/post/:post_title"
//         render={routeProps => (
//           <Suspense
//             fallback={
//               <>
//                 <Icon type="loading" style={{fontSize: '50px'}}></Icon>
//               </>
//             }
//           >
//             <Post
//               {...routeProps}
//               {...props.posts.find(
//                 ({ url }) => url === (props.match.params as any).post_title
//               )!}
//               {...post!}
//               onSetTag={setTag}
//             />
//           </Suspense>
//         )}
//       />
//     </>
//   );
// });

// export default PostLayout;

type PostLayoutState = {
  currentPage: number
};
export default class PostLayout extends React.Component<
  RouteComponentProps & PostLayoutProps,
  PostLayoutState
> {
  readonly state: PostLayoutState = {
    currentPage: Number(sessionStorage.getItem('currentPage')) || 1
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
    sessionStorage.setItem('currentPage', `${this.state.currentPage}`);
  }

  render() {
    return (
      <>
        <Route
          path={[this.props.match.path, `${this.props.match.path}tag/:tag`]}
          exact
          render={props => (
            <PostList
              {...props}
              posts={this.props.posts}
              currentPage={this.state.currentPage}
              onSetPage={this.setPage}
            />
          )}
        />
        <Route
          path={`/post/:post_title`}
          render={props => (
            <Suspense
              fallback={
                <>
                  <Icon type="loading" style={{fontSize: '50px'}}></Icon>
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
    );
  }
}
