import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { formularioHotel } from '../actions/authentication';
import classnames from 'classnames';

class FormularioHotel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            price: '',
            errors: {}
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const hotel = {
            hotel: {
                name: this.state.name,
                price: this.state.price
             }
        }
        this.props.formularioHotel(hotel, this.props.history.push('/'));
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.hotels) {
            this.props.history.push('/')
        }
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
            this.props.history.push('/')
        }
    }

    componentDidMount() {
        if(this.props.hotels) {
            this.props.history.push('/');
        }
    }

    render() {
        const {errors}  = this.props;
        return(
        <div className="container" style={{ marginTop: '20px'}}>
            <h2 style={{marginBottom: '40px'}}>Cargar Datos</h2>
            <form onSubmit={ this.handleSubmit }>
                <div className="form-group">
                    <input
                    type="text"
                    placeholder="Nombre"
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.name
                    })}
                    name="name"
                    onChange={ this.handleInputChange }
                    value={ this.state.name }
                    />
                    {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                </div>
                <div className="form-group">
                    <input
                    type="number"
                    placeholder="Precio"
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.price
                    })}
                    name="price"
                    onChange={ this.handleInputChange }
                    value={ this.state.price }
                    />
                    {errors.price && (<div className="invalid-feedback">{errors.price}</div>)}
                </div>
                
                <div className="form-group">
                    <button type="submit" className="btn btn-danger" style={{  width: '100%'}}>
                        Cargar Hotel
                    </button>
                </div>
            </form>
        </div>
        )
    }
}

FormularioHotel.propTypes = {
    formularioHotel: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state, props) => ({
    auth: state.auth,
    hotels: state.auth.hotels,
    errors: state.errors
});

export default connect(mapStateToProps,{ formularioHotel })(withRouter(FormularioHotel))