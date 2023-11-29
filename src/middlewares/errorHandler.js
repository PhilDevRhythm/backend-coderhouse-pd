export const errorHandler = async (error, req, res, next) => {
  try {
    console.log(`${error.message}`);
    const status = error.status || 404;
    res.status(status).send(error.message);
  } catch (error) {
    next(error);
  }
};
