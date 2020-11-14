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
    return this._doFetchBlob('/api/checkFace', body);
  };
}

const faceRecognitionApi = new FaceRecognitionApi();
faceRecognitionApi.setApiHost(FACE_RECOGNITION_API_HOST);
export default faceRecognitionApi;
