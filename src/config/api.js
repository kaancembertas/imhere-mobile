/*
 * Author: Kaan Çembertaş
 * No: 200001684
 */
const IMHERE_API_HOST = 'http://192.168.0.12:5000';
const FACE_RECOGNITION_API_HOST = 'http://192.168.0.12:5001';

const ENTITY = {
  USER: {
    STUDENT: 0,
    INSTRUCTOR: 1,
  },
  ATTENDENCE: {
    NOT_PROCESSED: 0,
    JOINED: 1,
    NOT_JOINED: 2,
  },
};

export { ENTITY, IMHERE_API_HOST, FACE_RECOGNITION_API_HOST };
