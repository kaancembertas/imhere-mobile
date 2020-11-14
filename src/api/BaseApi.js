import HttpService from './HttpService';

export default class BaseApi extends HttpService {
  /*
   * Where the requests anonymous,
   * headers does not have Authorization
   */
  _doAnonymousPost = (endpoint, body, headers = {}) =>
    this.anonymousFetch({
      method: 'post',
      endpoint,
      body,
      headers,
    });

  _doAnonymousGet = (endpoint, headers = {}) =>
    this.anonymousFetch({
      method: 'get',
      endpoint,
      headers,
    });

  _doPost = (endpoint, body, headers = {}) =>
    this.fetch({
      method: 'post',
      endpoint,
      body,
      headers,
    });

  _doGet = (endpoint, headers = {}) =>
    this.fetch({
      method: 'get',
      endpoint,
      headers,
    });

  _doFetchBlob = (endpoint, body, headers = {}) =>
    this.fetchBlob({
      method: 'post',
      endpoint,
      body,
      headers,
    });
}
