// errorHandler.js
export const errorHandler = (error, req, res) => {
    const status = error.status || 500;
    const message = error.message || "Unexpected error";

  res.status(status).render("error", { status, message });
};
