import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Link,
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
  render() {
    return (
      <Router>
        <Layout className="App" style={{ backgroundColor: '#fff' }}>
          <Header className="App-header">
            <div style={{
                maxWidth: '660px',
                margin: '20px auto',
                display: 'flex',
                // justifyContent: 'space-between',
                justifyContent: 'flex-end',
                alignItems: 'center',
                // flexDirection: 'row-reverse',
            }}>
              <div className="App-header-item-container" style={{
                justifySelf: 'flex-start',
                marginRight: 'auto',
              }}><Link to="/" className="App-header-item">
                <Icon component={Logo} className="App-logo" />
              </Link></div>
              <div className="App-header-item-container"><Link to="/" className="App-header-item">我的 PR 不可能被 Approved</Link></div>
              {/* <div className="App-header-item-container"><Link to="/" className="App-header-item">Demo Oriented</Link></div> */}
          </div>
          </Header>
          <Content className="App-content">
           <Route
              path="/"
              render={props => (
                <PostLayout {...props} posts={Posts} />
              )}
            />
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
