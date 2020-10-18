import ApiResponseModel from './models/ApiResponseModel';
import { getData, storageKeys, storageTypes } from '../utils/asyncStorage';

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
    console.log(response);
    if (response.status === 400) {
      const apiResponse = new ApiResponseModel(400, false);
      const responseBody = await response.json();
      apiResponse.setErrorMessage(responseBody.errorMessage || 'Bad Request');
      return apiResponse;
    }

    if (response.status === 401) {
      const apiResponse = new ApiResponseModel(401, false);
      apiResponse.setErrorMessage(
        'The session has been expired, please login again.',
      );
      return apiResponse;
      //TODO: Dispatch authStack
    }

    if (response.status === 204) {
      return new ApiResponseModel(204, true, null);
    }

    if (response.status === 200) {
      const responseBody = await response.json();
      const apiResponse = new ApiResponseModel(200, true, responseBody);
      return apiResponse;
    }

    const apiResponse = new ApiResponseModel(response.status, false);
    apiResponse.setErrorMessage('Unhandled error occured [HttpService]');
    return apiResponse;
  };

  fetch = async (options) => {
    const ACCESS_TOKEN = await getData(
      storageKeys.ACCESS_TOKEN,
      storageTypes.VALUE,
    );

    const newOptions = {
      ...options,
      headers: {
        Authorization: 'Bearer ' + ACCESS_TOKEN,
      },
    };

    const response = await this.anonymousFetch(newOptions);
    return response;
  };
}
