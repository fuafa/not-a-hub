import React, { Component, Suspense, LazyExoticComponent } from 'react'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import logo from './logo.svg'
import './App.css'

import LoadableFAQ from './LoadableFAQ'

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
							<span className="App-link-wrapper">
								<Link to="/">
									<img src={logo} className="App-logo" alt="logo"/>
								</Link>
							</span>
							<Link to="/" className="App-link">
								Home
							</Link>
							<Link to="/tutor" className="App-link">
								Tutor
							</Link>
							<Link to="/faq" className="App-link">
								AsyncFAQ
							</Link>
							<Link to="/" className="App-link">
								Resume
							</Link>
							<Link to="/" className="App-link">
								About
							</Link>
						</div>
          </header>
          <main className="App-content">
            <Route path="/" exact={true} />
            <Route path="/tutor" component={waitingComponent(LazyTutor)} />
            <Route path="/faq" component={LoadableFAQ} />
          </main>
        </div>
      </Router>
    )
  }
}

export default App
