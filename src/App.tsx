import React, { Component, Suspense, LazyExoticComponent } from 'react'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import logo from './logo.svg'
import './App.css'
import './Tutor.css'

// import Tutor from './Tutor'
// import FAQ from './FAQ'
import LoadableFAQ from './LoadableFAQ'

const LazyTutor = React.lazy(() => import('./Tutor'))

function waitingComponent(C: LazyExoticComponent<any>) {
	// const LazyTutor = React.lazy(() => import('./Tutor'))
	return (props: any) => (
		<Suspense fallback={<div>Loading...</div>}>
			{/* <LazyTutor {...props}></LazyTutor> */}
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
                        <img src={logo} className="App-logo" alt="logo" />
                        <p>
                            Edit <code>src/App.tsx</code> and save to reload.
                        </p>
                        {/* <a
                            className="App-link"
                            href="https://reactjs.org"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Learn React
                        </a> */}
                        <Link to="/" className="App-link">
                            Home
                        </Link>
						<Link to="/tutor" className="App-link">
							Tutor
						</Link>
						<Link to="/faq" className="App-link">AsyncFAQ</Link>
                    </header>
                    <div>
                        <Route path="/" exact={true} />
						<Route path="/tutor" component={waitingComponent(LazyTutor)} />
						<Route path="/faq" component={LoadableFAQ}></Route>
                    </div>
                </div>
            </Router>
        )
    }
}

export default App
