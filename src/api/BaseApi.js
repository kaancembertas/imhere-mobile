import HttpService from './HttpService';

export default class BaseApi extends HttpService {
  /*
   * Where the requests anonymous,
   * headers does not have Authorization
   */
  _doAnonymousPost = (endpoint, body) =>
    this.anonymousFetch({
      method: 'post',
      endpoint,
      body,
    });

  _doAnonymousGet = (endpoint) =>
    this.anonymousFetch({
      method: 'get',
      endpoint,
    });

  _doPost = (endpoint, body) =>
    this.fetch({
      method: 'post',
      endpoint,
      body,
    });

  _doGet = (endpoint) =>
    this.fetch({
      method: 'get',
      endpoint,
    });
}
