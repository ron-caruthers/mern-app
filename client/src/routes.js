import React from 'react';
import {
    BrowserRouter as Router,
    Route,
  } from 'react-router-dom';

/**
 * Import all page components here
 */
class App extends Component {
    return (
        <Router path="/" component={App}>
            <Route path="/location" component={Location} />
        </Router>
    )
}