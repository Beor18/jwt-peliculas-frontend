import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER, CARGAR_USUARIO, CARGAR_HOTELES, AGREGAR_HOTEL } from './types';
import setAuthToken from '../setAuthToken';
import jwt_decode from 'jwt-decode';

const URL_BASE = 'https://api-mas-tv.herokuapp.com/api/';

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
}

export const registerUser = (user, history) => dispatch => {
    axios.post(URL_BASE + 'users/register', user)
            .then(res => user)
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            });
}

export const loginUser = (user) => dispatch => {
    axios.post(URL_BASE + 'users/login', user)
            .then(res => {
                const token = res.data.jwt;
                localStorage.setItem('jwt', token);
                setAuthToken(token);
                const decoded = jwt_decode(token);
                dispatch(setCurrentUser(decoded));
            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            });
}

export function formularioHotel(data) {
    return dispatch => {
        axios({
            method: 'POST',
            url: URL_BASE + 'peliculas',
            headers: headers,
            data: data
        })
        .then(response => {
            dispatch({
                type: AGREGAR_HOTEL,
                payload: response.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
    }
}

export function cargarUsuario() {
    return dispatch => {
        axios({
            method: 'GET',
            url: URL_BASE + 'perfil',
            headers: headers,
        })
        .then(response => dispatch({
            type: CARGAR_USUARIO, 
            payload: response.data
        })
        ).catch(error => console.error(error.response));
    }
}

export function cargarHoteles() {
    return dispatch => {
        axios({
            method: 'GET',
            url: URL_BASE + 'peliculas',
            headers: headers,
        })
        .then(response => dispatch({
            type: CARGAR_HOTELES,
            payload: response.data
        })
        ).catch(error => console.error(error.response));
    }
}

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const logoutUser = () => dispatch => {
    localStorage.removeItem('jwt');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
}