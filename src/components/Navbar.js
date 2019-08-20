import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authentication';
import { withRouter } from 'react-router-dom';
import { guestLinks } from '../components/permisos/MensajePermiso';

class Navbar extends Component {

    onLogout(e) {
        e.preventDefault();
        this.props.logoutUser(this.props.history.push('/login'));
    }

    render() {
        const {isAuthenticated} = this.props.auth;
        const cargarRegistro = (
            <Link className="nav-link" to="/cargar-registro">Cargar Registros</Link>
        )
        const authLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <img src={this.props.user.avatar} alt="..." className="rounded-circle" style={{width: '40px', height: '40px'}} />
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/perfil">Perfil</Link>
                </li>
                <li className="nav-item">
                    { this.props.user.role === 'administrador' ? cargarRegistro : guestLinks }   
                </li>
                <li className="nav-item">
                    <a href={'/login'} className="nav-link" onClick={this.onLogout.bind(this)}>Salir</a>
                </li>
            </ul>
        )
        const guestNavLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/register">Registro</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
            </ul>
        )
        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link className="navbar-brand" to="/">React Redux Auth</Link>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {isAuthenticated ? authLinks : guestNavLinks}
                </div>
            </nav>
        )
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    user: state.auth.user
})

export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));