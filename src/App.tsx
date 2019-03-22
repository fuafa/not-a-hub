import React, { Component, LazyExoticComponent, Suspense } from 'react';
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

function waitingComponent(C: LazyExoticComponent<any>) {
  // const LazyTutor = React.lazy(() => import('./Tutor'))
  return (props: any) => (
    <Suspense fallback={<div>Loading...</div>}>
      <C {...props} />
    </Suspense>
  );
}

class App extends Component {
  render() {
    return (
      <Router>
        <Layout className="App" style={{ backgroundColor: '#fff' }}>
          <Header className="App-header" style={{ textAlign: 'center' }}>
            <Link to="/">
              <Icon component={Logo} className="App-logo" />
            </Link>
          </Header>
          <Content className="App-content">
            <Route
              path="/"
              exact={true}
              render={props => <Redirect to="/post" />}
            />
            <Route
              path="/post"
              render={props => <PostLayout {...props} posts={Posts} />}
            />
            <Route path="/tutor" component={waitingComponent(LazyTutor)} />
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
              <p>
                Hi there, this is fuafa, I view myself as a front-end developer
                but more than that. Currently seeking for a job as a software
                developer in Shenzhen.
              </p>
              <p>
                I am addictive to TypeScript in the latest months, expecially
                the type system behind it.
              </p>
              <p>
                Feel free to contact me if you are also interested in TypeScript
                or me...
              </p>
            </div>
          </Footer>
        </Layout>
      </Router>
    );
  }
}

export default App;
