import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { cargarHoteles } from '../actions/authentication';
import { withRouter } from 'react-router-dom';

class ListaHoteles extends Component {
    
    componentDidMount(){
        this.props.cargarHoteles()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
          return this.listarHoteles()
        }
    }

    listarHoteles() {
        const pelicula = this.props.peliculas
        return Object.keys(pelicula).map(key => ( 
            <div key={key} className="card col-lg-4 col-md-4 col-sm-4 col-xs-12 mx-1" style={{ float: 'left', marginTop: '15px', maxWidth: '425px'}}>
                <div className="card-body">
                <h5 className="card-title">{pelicula[key].name}</h5>
                <p className="card-text"> {pelicula[key].description} </p>
                </div>
            </div>
        ))
    }

    render() {
        return(
            <div className="row mx-auto">{this.listarHoteles()}</div>
        )
    }
}

ListaHoteles.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state, props) => ({
    auth: state.auth,
    peliculas: state.auth.peliculas
})

export default connect(mapStateToProps, { cargarHoteles })(withRouter(ListaHoteles));