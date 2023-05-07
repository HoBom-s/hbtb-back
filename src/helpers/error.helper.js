/**
 * Error Class => 런타임 오류 시 발생하는 Error
 * Error Class 상속
 */
class _APIErrorHandler extends Error {
  constructor(msg, status) {
    super(msg);
    this.msg = msg;
    this.status = status;
  }
}

/**
 * Error Class를 상속 받은 APIErrorHandler class 정의
 */
class APIErrorHandler extends _APIErrorHandler {
  constructor(msg, status) {
    super(msg, status);
  }
}

Object.freeze(APIErrorHandler);
export default APIErrorHandler;
