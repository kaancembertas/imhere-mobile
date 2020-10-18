export default class ApiResponseModel {
  statusCode = null;
  success = null;
  errorMessage = null;
  data = null;

  constructor(statusCode, success, data) {
    this.statusCode = statusCode;
    this.success = success;
    this.data = data;
  }

  setErrorMessage = (errorMessage) => {
    this.errorMessage = errorMessage;
    this.success = false;
  };
}
