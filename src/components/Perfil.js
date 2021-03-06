import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { cargarUsuario } from '../actions/authentication';
import { withRouter } from 'react-router-dom';
import Navbar from '../components/Navbar';

class Perfil extends React.Component {

  componentDidMount() {
    this.props.cargarUsuario()
  }

  render() {
    const {isAuthenticated} = this.props.auth;
    const authLinks = (
      <div className="">
        <Navbar />
        <div className="container" style={{marginTop: '20px'}}>
          <h2>Perfil de {this.props.user.name}</h2>
          Email del Usuario: <h4>{this.props.user.email}</h4>
        </div>
      </div>
    )
    const guestLinks = (
      <h2>Bienvenido a Perfil componente usted no esta logeado</h2>
    )
    return(
      <div className="">
        {isAuthenticated ? authLinks : guestLinks}
      </div>
            
    );
  }
}

Perfil.propTypes = {
  auth: PropTypes.object.isRequired
}

function mapStateToProps(state, props) {
  return {
    auth: state.auth,
    user: state.auth.user
  }
}

export default connect(mapStateToProps, {cargarUsuario})(withRouter(Perfil))