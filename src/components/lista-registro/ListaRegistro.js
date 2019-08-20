import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { formularioHotel } from '../../actions/authentication';
import { withRouter } from 'react-router-dom';
// import ListaHoteles from '../../components/ListaHoteles';
import FormularioHotel from '../../components/FormularioHotel';

class ListaRegistro extends Component {

    render() {
        // const listaRegistro = (
        //     <div className="col-12"> 
        //         <ListaHoteles />
        //     </div>
        // )
        
        return(
            <div className="col-12" style={{ marginTop: '20px', marginBottom: '20px'}}>
               <div className="col-4 clearfix">
                    <FormularioHotel />
                </div>
            </div>
            
        );
    }
}

ListaRegistro.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    user: state.auth.user
})

export default connect(mapStateToProps, { formularioHotel })(withRouter(ListaRegistro));