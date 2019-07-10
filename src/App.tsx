import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Route
} from 'react-router-dom';
import { Icon, Layout } from 'antd';

import Logo from './Logo';
import './App.css';

import LoadableFAQ from './LoadableFAQ';
import PostLayout from './PostLayout';
// import Post from './Post';
import { WaitingComponent } from './utils/utils';
import Posts from './out/PostList.json';

const { Header, Footer, Content } = Layout;

Posts.sort((a, b) => {
  if (a.date > b.date) {
    return -1;
  } else {
    return 0;
  }
});

const LazyTutor = React.lazy(() => import('./Tutor'));

class App extends Component {
  private postLayoutRef = React.createRef<PostLayout>();
  /**
   * 很久没看，大概是想要返回主页时清除 tag，我艹，不好是什么意思...
   * TODO: 这样做不好...
   */
  onGoBackHomePage = () => {
    const node = this.postLayoutRef.current;

    node && node.setTag('');
  };
  render() {
    return (
      <Router>
        <Layout className="App" style={{ backgroundColor: '#fff' }}>
          <Header className="App-header" style={{ textAlign: 'center' }}>
            {/* 用 Redirect to /post 导致 ref 更新不起作用，（PostLayout.componentDidUpdate 不调用）, 因为在 path="/" 到 path="/post" 触发 componentWillUnmount, cao */}
            <Link to="/posts" onClick={this.onGoBackHomePage}>
              <Icon component={Logo} className="App-logo" />
            </Link>
          </Header>
          <Content className="App-content">
            <Route
              path="/"
              exact={true}
              render={() => <Redirect to="/posts" />}
            />
            <Route
              path="/posts"
              render={props => (
                <PostLayout ref={this.postLayoutRef} {...props} posts={Posts} />
              )}
            />
            {/* <Route
              path="post/:post_title"
              render={props => (
                <Suspense
                  fallback={
                    <Icon type="loading" style={{fontSize: '50px'}}></Icon>
                  }
                >
                <Post
                  {...props}
                  {...Posts.find(
                    ({ url }) => url === props.match.params.post_title
                  )!}
                  onSetTag={newTag => console.log(newTag)}
                />
                </Suspense>
              )}
            /> */}
            <Route path="/tutor" component={WaitingComponent(LazyTutor)} />
            <Route path="/faq" component={LoadableFAQ} />
          </Content>
          <Footer>
            <div className="footer-inner">
              <a
                href="https://www.zhihu.com/people/zixiang-li-57/activities"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon type="zhihu" className="App-social" theme="outlined" />
              </a>
              <a
                href="https://github.com/fuafa"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon type="github" className="App-social" theme="outlined" />
              </a>
              <a href="mailto:xiaofalzx@gmail.com">
                <Icon type="mail" className="App-social" theme="outlined" />
              </a>
            </div>
            <div className="App-description">
              <p style={{ textAlign: 'center' }}>
                Made with <Icon type="heart" theme="filled" /> by Heuafa @2019
              </p>
            </div>
          </Footer>
        </Layout>
      </Router>
    );
  }
}

export default App;
