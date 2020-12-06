import BaseApi from './BaseApi';
import { FACE_RECOGNITION_API_HOST } from '../config/api';

class FaceRecognitionApi extends BaseApi {
  checkFace = (image) => {
    const body = [
      {
        name: 'image',
        filename: 'image.png',
        type: 'image/png',
        data: image,
      },
    ];
    return this._doAnonymousFetchBlob('/api/checkFace', body);
  };

  addAttendence = (image, lectureCode, week) => {
    const body = [
      {
        name: 'image',
        filename: 'image.png',
        type: 'image/png',
        data: image,
      },
      {
        name: 'lectureCode',
        data: lectureCode.toString(),
      },
      {
        name: 'week',
        data: week.toString(),
      },
    ];
    return this._doFetchBlob('/api/addAttendence', body);
  };
}

const faceRecognitionApi = new FaceRecognitionApi();
faceRecognitionApi.setApiHost(FACE_RECOGNITION_API_HOST);
export default faceRecognitionApi;
