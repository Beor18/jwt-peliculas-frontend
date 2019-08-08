import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Perfil from './components/Perfil';

import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {
  render() {
    return (
      
        <Router>
            <div>
              <Navbar />
                <Route exact path="/" component={ Home } />
                <div className="container-fluid">
                  <Route exact path="/register" component={ Register } />
                  <Route exact path="/login" component={ Login } />
                  <Route exact path="/perfil" component={ Perfil } />
                </div>
            </div>
        </Router>
      
    );
  }
}

export default App;
