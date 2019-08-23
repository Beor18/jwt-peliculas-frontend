import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../actions/authentication';
import { withRouter } from 'react-router-dom';
import ListaHoteles from '../components/ListaHoteles';
import { invitadoLinks} from '../components/permisos/MensajePermiso';
import Navbar from '../components/Navbar';

class Home extends Component {

    render() {
        const { isAuthenticated } = this.props.auth;

        const authLinks = (
            <div className="">
                <Navbar />  
                <div className="container" style={{marginTop: '20px'}}>
                    <ListaHoteles />
                </div>
            </div>
        )
        
        return(
            <div className="">
               { isAuthenticated ? authLinks : invitadoLinks }
            </div>
            
        );
    }
}

Home.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    user: state.auth.user
})

export default connect(mapStateToProps, { loginUser })(withRouter(Home));