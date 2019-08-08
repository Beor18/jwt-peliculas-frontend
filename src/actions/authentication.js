import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER, CARGAR_USUARIO, CARGAR_HOTELES, AGREGAR_HOTEL } from './types';
import setAuthToken from '../setAuthToken';
import jwt_decode from 'jwt-decode';

const URL_BASE = 'https://api-mas-tv.herokuapp.com/api/';

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' +  localStorage.getItem('token')
}

export const registerUser = (user, history) => dispatch => {
    axios.post(URL_BASE + 'sign_up', user)
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
                const token = res.data.token;
                localStorage.setItem('token', token);
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
                payload: err.response.data.errors
            });
        });
    }
}

export function cargarUsuario() {
    return dispatch => {
        axios({
            method: 'GET',
            url: URL_BASE + 'my_user',
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

export const logoutUser = (history) => dispatch => {
    localStorage.removeItem('token');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
}