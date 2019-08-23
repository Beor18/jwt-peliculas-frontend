import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import Register from './components/Register';
import Login from './components/login/Login';
import Home from './components/Home';
import Perfil from './components/Perfil';
import ListaRegistro from './components/lista-registro/ListaRegistro';
import NotFoundPage from './components/permisos/NotFoundPage';

import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {
  render() {
    return (
      
        <BrowserRouter>
          <Switch>
                <Route exact path="/" component={ Login } />
                <Route exact path="/home" component={ Home } />
                <Route exact path="/register" component={ Register } />
                <Route exact path="/login" component={ Login } />
                <Route exact path="/perfil" component={ Perfil } />
                <Route exact path="/cargar-registro" component={ ListaRegistro } />
                <Route path="*" component={ NotFoundPage } />
            </Switch>
        </BrowserRouter>
      
    );
  }
}

export default App;
