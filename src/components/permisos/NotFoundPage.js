import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../permisos/NotFoundPage.scss';

class NotFoundPage extends Component{
    render(){
        return (
            <section className="error-container text-center">
                <h1>404</h1>
                <div className="error-divider">
                    <h2>PÁGINA NO ENCONTRADA</h2>
                    {/* <p className="description">We Couldn't Find This Page</p> */}
                </div>
                <Link to="/" className="return-btn">Volver al inicio </Link>
            </section>
        )
    }
}

export default NotFoundPage;