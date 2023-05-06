class _APIErrorHandler extends Error {
  constructor(msg, status) {
    super(msg);
    this.msg = msg;
    this.status = status;
  }
}

class APIErrorHandler extends _APIErrorHandler {
  constructor(msg, status) {
    super(msg, status);
  }
}

Object.freeze(APIErrorHandler);
export default APIErrorHandler;
