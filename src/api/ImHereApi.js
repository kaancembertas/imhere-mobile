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
  getLectures = () => {
    return this._doGet('/api/lecture');
  };
  getAttendence = (lectureCode) => {
    return this._doGet('/api/attendence/' + lectureCode);
  };

  checkEmailExists = (email) => {
    return this._doAnonymousGet('/api/user/check/' + email);
  };

  getLectureStudents = (lectureCode) => {
    return this._doGet('/api/lecture/students/' + lectureCode);
  };

  getAttendenceByUser = (lectureCode, userId) => {
    return this._doPost('/api/attendence/attendencebyuser', {
      lectureCode,
      userId,
    });
  };

  getAllLectures = () => {
    return this._doGet('/api/lecture/getall');
  };

  selectLectures = (lectureCodes) => {
    return this._doPost('/api/lecture/selectlectures', lectureCodes);
  };
}

const imHereApi = new ImHereApi();
imHereApi.setApiHost(IMHERE_API_HOST);
export default { ...imHereApi };
