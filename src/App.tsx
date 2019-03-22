import React, { Component, LazyExoticComponent, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Route
} from 'react-router-dom';
import logo from './logo.svg';
import zhihu from './zhihu.svg';
import github from './github.svg';
import gmail from './gmail.svg';
import './App.css';

import LoadableFAQ from './LoadableFAQ';
import PostLayout from './PostLayout';
import Posts from './out/PostList.json';
import { Button } from 'antd';

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
        <div className="App">
          <header className="App-header">
            <div className="header-inner">
              {/* <Link to="/tutor" className="App-link">
								Tutor
							</Link>
							<Link to="/faq" className="App-link">
								AsyncFAQ
							</Link> */}
              <span className="App-link-wrapper">
                <Link to="/">
                  <img src={logo} className="App-logo" alt="logo" />
                </Link>
              </span>
              {/* <Link to="/" className="App-link">
                Resume
              </Link>
              <Link to="/" className="App-link">
                About
              </Link> */}
            </div>
          </header>
          <main className="App-content">
            <Route
              path="/"
              exact={true}
              render={props => (
                // <PostList {...props} posts={Posts}/>
                <Redirect to="/post" />
              )}
            />
            <Route
              path="/post"
              render={props => <PostLayout {...props} posts={Posts} />}
            />
            <Route path="/tutor" component={waitingComponent(LazyTutor)} />
            <Route path="/faq" component={LoadableFAQ} />
          </main>
          <footer>
            <div className="footer-inner">
              <a
                href="https://www.zhihu.com/people/zixiang-li-57/activities"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={zhihu} alt="zhihu" className="App-social" />
              </a>
              <a
                href="https://github.com/fuafa"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={github} alt="github" className="App-social" />
              </a>
              <a href="mailto:xiaofalzx@gmail.com">
                <img src={gmail} alt="gmail" className="App-social" />
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
          </footer>
        </div>
      </Router>
    );
  }
}

export default App;
