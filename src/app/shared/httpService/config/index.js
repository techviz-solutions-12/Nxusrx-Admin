import axios from 'axios';
import {store} from "../../../redux/store";
import {resetStore} from "../../../services/combinedAuth";
import {updateSession} from "../../../services/auth";
/*eslint no-undef: "error"*/

const API = axios.create({
    baseURL: `${process?.env?.REACT_APP_BASE_URL}/api/v1`,
    withCredentials:true,
    timeout: 10000,
    headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
    },
});

/**
 * api request interceptor
 * @param {Object} req request object
 * @returns
 */

const handleRequest = async (req) => {

    let token = await store?.getState()?.auth?.user ? store?.getState()?.auth?.user?.token : null;
    if (token != null || token != undefined) {
        req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
};

/**
 * api error interceptor
 * @param {Object} error error object
 * @returns
 */
const handleError = (error) => {

    if (error?.response?.status == "424") {
        store.dispatch(updateSession(true))

    }

    if (error?.response?.status == 422) {
        localStorage.removeItem('token');
        let action = 'USER_LOGOUT';
        store.dispatch(resetStore(action));
        window.history.pushState({}, null, '/login');
        // toast.error('Session is expired! Please login again');
    }
    let parsed_error = Object.assign({}, error);
    if (parsed_error.code == "ECONNABORTED" && !parsed_error.config.__isRetryRequest) {
        parsed_error.config.__isRetryRequest = true;
        return API.request(parsed_error.config);
    }

    return Promise.reject(parsed_error?.response?.data);
};

/**
 * api response interceptor
 * @param {Object} response response object
 * @returns
 */
const handleResponse = (response) => {

    return Promise.resolve(response.data);
};

API.interceptors.request.use(handleRequest);


API.interceptors.response.use(handleResponse, handleError);

export default API;
