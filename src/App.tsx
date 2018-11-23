import React, { Component } from 'react'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import logo from './logo.svg'
import './App.css'
import './Tutor.css'

import Tutor from './Tutor'

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
                    </header>
                    <div>
                        <Route path="/" exact={true} />
                        <Route path="/tutor" component={Tutor} />
                    </div>
                </div>
            </Router>
        )
    }
}

export default App
