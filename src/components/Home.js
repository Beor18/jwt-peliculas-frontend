import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../actions/authentication';
import { withRouter } from 'react-router-dom';
import ListaHoteles from '../components/ListaHoteles';
import { invitadoLinks} from '../components/permisos/MensajePermiso';

class Home extends Component {

    render() {
        const { isAuthenticated } = this.props.auth;

        const authLinks = (
            <div className="col-12">  
                <ListaHoteles />
            </div>
        )
        
        return(
            <div className="col-12" style={{ marginTop: '20px', marginBottom: '20px'}}>
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