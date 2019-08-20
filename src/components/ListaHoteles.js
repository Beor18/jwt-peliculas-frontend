import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { cargarHoteles } from '../actions/authentication';
import { withRouter } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faStar } from '@fortawesome/free-solid-svg-icons'

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
        const pelicula = this.props.peliculas;
        return Object.keys(pelicula).map(key => ( 
            <div key={key} className="col-md-4">
                <div className="card bg-dark text-white">
                    <img src={pelicula[key].images} className="card-img" alt="..." />
                    <div className="card-img-overlay">
                        {/* <h5 className="card-title">{pelicula[key].name}</h5>
                        <p className="card-text">{pelicula[key].description}</p>
                        <p className="card-text">Last updated 3 mins ago</p> 
                        <FontAwesomeIcon icon={faStar} /> */}
                    </div>
                </div>
            </div>
            
        ))
    }

    render() {
        return(
            <div className="row">{this.listarHoteles()}</div>
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