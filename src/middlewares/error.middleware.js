/**
 * Error Middleware
 *
 * Server의 최상위에서 Error를 catch
 *
 * @param {Error} error
 */
function errorMiddleware(error, req, res) {
  const bodyData = req.body;
  const { status, message } = error;
  if (status >= 400 && status < 500) {
    // Request error
    const errorStatus = status || 400;
    res.status(errorStatus).send({
      data: bodyData,
      message: `${errorStatus}: ${message}`,
    });
  } else if (status >= 500) {
    // Server internal error
    const errorStatus = status || 500;
    res.status(errorStatus).send({
      data: bodyData,
      message: `${errorStatus}: ${message}`,
    });
  }
  res.status(status).send({
    message: `${status}: ${message}`,
  });
}

export default errorMiddleware;
