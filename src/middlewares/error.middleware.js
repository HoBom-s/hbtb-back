/**
 * Error Middleware
 *
 * Server의 최상위에서 Error를 catch
 *
 * @param {Error} error
 */

// eslint-disable-next-line no-unused-vars
function errorMiddleware(error, req, res, next) {
  const bodyData = req.body;
  const { status, message } = error;
  if (status >= 400 && status < 500) {
    // Request error
    const errorStatus = status || 400;
    return res.status(errorStatus).send({
      data: bodyData,
      message: `${errorStatus}: ${message}`,
    });
  } else if (status >= 500) {
    // Server internal error
    const errorStatus = status || 500;
    return res.status(errorStatus).send({
      data: bodyData,
      message: `${errorStatus}: ${message}`,
    });
  }
  next();
}

export default errorMiddleware;
