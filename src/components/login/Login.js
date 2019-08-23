import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authentication';
import classnames from 'classnames';
import '../login/Login.scss';

class Login extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
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
        const user = {
            email: this.state.email,
            password: this.state.password,
        }
        this.props.loginUser(user);
    }

    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/home');
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated) {
            this.props.history.push('/home')
        }
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        } 
    }

    render() {
        const {errors} = this.state;
        return(
            <div className="container-fluid">
            <div className="row no-gutter">
              <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
              <div className="col-md-8 col-lg-6">
                <div className="login d-flex align-items-center py-5">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-9 col-lg-8 mx-auto">
                        <h3 className="login-heading mb-4">Bienvenido a Más TV!</h3>
                          <form onSubmit={ this.handleSubmit }>
                              <div className="form-label-group">
                                  <input
                                  type="email"
                                  placeholder="Email"
                                  className={classnames('form-control form-control-lg', {
                                      'is-invalid': errors.email
                                  })}
                                  name="email"
                                  onChange={ this.handleInputChange }
                                  value={ this.state.email }
                                  />
                                  {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                              </div>
                              <div className="form-label-group">
                                  <input
                                  type="password"
                                  placeholder="Contraseña"
                                  className={classnames('form-control form-control-lg', {
                                      'is-invalid': errors.password
                                  })} 
                                  name="password"
                                  onChange={ this.handleInputChange }
                                  value={ this.state.password }
                                  />
                                  {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                              </div>
                                <button type="submit" className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2">
                                      Ingresar
                                </button>
                          </form>
                        {/* <form>
                          <div className="form-label-group">
                            <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
                            <label for="inputEmail">Email address</label>
                          </div>
          
                          <div className="form-label-group">
                            <input type="password" id="inputPassword" class="form-control" placeholder="Password" required>
                            <label for="inputPassword">Password</label>
                          </div>
          
                          <div className="custom-control custom-checkbox mb-3">
                            <input type="checkbox" class="custom-control-input" id="customCheck1">
                            <label class="custom-control-label" for="customCheck1">Remember password</label>
                          </div>
                          <button className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2" type="submit">Sign in</button>
                          <div className="text-center">
                            <a className="small" href="#">Forgot password?</a></div>
                        </form> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, { loginUser })(Login)