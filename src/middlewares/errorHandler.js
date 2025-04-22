// errorHandler.js
export const errorHandler = (error, req, res, next) => {
    const status = error.status || 500;
  res.render("error", { error });
};
