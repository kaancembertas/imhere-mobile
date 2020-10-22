export default class ApiResponseModel {
  statusCode = null;
  success = null;
  errorMessage = null;
  data = null;

  setData = (data) => {
    this.data = data;
    this.success = true;
  };

  setSuccess = (success) => {
    this.success = success;
  };

  setStatusCode = (statusCode) => {
    this.statusCode = statusCode;
  };

  setErrorMessage = (errorMessage) => {
    this.errorMessage = errorMessage;
    this.success = false;
  };
}
