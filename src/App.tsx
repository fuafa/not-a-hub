import React, { Component, Suspense, LazyExoticComponent } from 'react'
import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom'
import logo from './logo.svg'
import './App.css'

import LoadableFAQ from './LoadableFAQ'
import PostLayout from './PostLayout'
// import PostList from './PostList'
import Posts from "./out/PostList.json";

Posts.sort((a, b) => {
  if (a.date > b.date) return -1
  else return 0
})
const LazyTutor = React.lazy(() => import('./Tutor'))

function waitingComponent(C: LazyExoticComponent<any>) {
  // const LazyTutor = React.lazy(() => import('./Tutor'))
  return (props: any) => (
    <Suspense fallback={<div>Loading...</div>}>
      <C {...props} />
    </Suspense>
  )
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
									<img src={logo} className="App-logo" alt="logo"/>
								</Link>
							</span>
							<Link to="/" className="App-link">
								Resume
							</Link>
							<Link to="/" className="App-link">
								About
							</Link>
						</div>
          </header>
          <main className="App-content">
            <Route path="/" exact={true} render={props => (
              // <PostList {...props} posts={Posts}/>
              <Redirect to="/post"/>
						)}/>
            <Route path="/post" render={props => (
							<PostLayout {...props} posts={Posts}/>
						)}/>
            <Route path="/tutor" component={waitingComponent(LazyTutor)}/>
            <Route path="/faq" component={LoadableFAQ} />
          </main>
          {/* <footer>
            <div className="footer-inner">
            </div>
          </footer> */}
        </div>
      </Router>
    )
  }
}

export default App
