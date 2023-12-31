import axios from 'axios';

import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from './types' ;

export function loginUser(dataToSubmit) {
    const request = axios.post('/api/users/login', dataToSubmit)
        .then(response => response.data )

    return { //request를 reducer에 넘겨주는 작업 중.
        type: LOGIN_USER,
        payload: request
    }
}

export function registerUser(dataToSubmit) {
    const request = axios.post('/api/users/register', dataToSubmit)
        .then(response => response.data )

    return { //request를 reducer에 넘겨주는 작업 중.
        type: REGISTER_USER,
        payload: request
    }
}

export function auth() {
    const request = axios.get('/api/users/auth')
        .then(response => response.data )

    return { //request를 reducer에 넘겨주는 작업 중.
        type: AUTH_USER,
        payload: request
    }
}