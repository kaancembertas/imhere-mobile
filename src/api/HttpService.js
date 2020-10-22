import ApiResponseModel from './models/ApiResponseModel';
import { getData, storageKeys, storageTypes } from '../utils/asyncStorage';
import store from '../redux/store';
import { logout } from '../redux/actions/authActions';

export default class HttpService {
  apiHost = '';

  setApiHost = (apiHost) => {
    this.apiHost = apiHost;
  };

  anonymousFetch = async (options) => {
    const body = options.body || {};
    const method = options.method || 'get';
    const endpoint = options.endpoint;
    const headers = options.headers || {};

    const REQUEST_URL = this.apiHost + endpoint;

    const fetchOptions = {
      method: method,
      headers: {
        ...headers,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    if (method === 'post' || method === 'put' || method === 'delete') {
      fetchOptions.body = JSON.stringify(body);
    }

    const response = await fetch(REQUEST_URL, fetchOptions);
    const apiResponse = new ApiResponseModel();
    apiResponse.setStatusCode(response.status);

    if (response.status === 400) {
      const responseBody = await response.json();
      apiResponse.setErrorMessage(responseBody.errorMessage || 'Bad Request');
      return apiResponse;
    }

    if (response.status === 401) {
      apiResponse.setErrorMessage(
        'Your session has been expired, please login again.',
      );
      store.dispatch(logout());
      return apiResponse;
    }

    if (response.status === 204) {
      apiResponse.setSuccess(true);
      return apiResponse;
    }

    if (response.status === 200) {
      const responseBody = await response.json();
      apiResponse.setData(responseBody);
      return apiResponse;
    }

    apiResponse.setErrorMessage('Unhandled error occured [HttpService]');
    return apiResponse;
  };

  fetch = async (options) => {
    const authData = await getData(storageKeys.AUTH_DATA, storageTypes.JSON);
    const accessToken = authData.token;

    const newOptions = {
      ...options,
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    };

    const response = await this.anonymousFetch(newOptions);
    return response;
  };
}
