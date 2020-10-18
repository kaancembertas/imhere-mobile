import BaseApi from './BaseApi';
import { IMHERE_API_HOST } from '../config/api';

class ImHereApi extends BaseApi {
  register = (body) => {
    return this._doAnonymousPost('/api/user/register', body);
  };
  authenticate = (body) => {
    return this._doAnonymousPost('/api/authentication', body);
  };
  getUserInfo = () => {
    return this._doGet('/api/user/info');
  };
}

const imHereApi = new ImHereApi();
imHereApi.setApiHost(IMHERE_API_HOST);
export default { ...imHereApi };
