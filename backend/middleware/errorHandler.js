const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// const errorHandler = (err, req, res, next) => {
//   const statusCode = res.statusCode ? res.statusCode : 500;
//   if (err.name === "ValidationError") {
//     const message = Object.values(err.errors).map((error) => error.message);
//     return res.status(statusCode).json({
//       success: false,
//       err: err.message,
//       stack: process.env.NODE_ENV === "production" ? null : err.stack,
//     });
//   } else if (err.name === "CastError") {
//     return res.status(statusCode).json({
//       success: false,
//       err: "Invalid Resource Id",
//       stack: process.env.NODE_ENV === "production" ? null : err.stack,
//     });
//   } else {
//     return res.status(statusCode).json({
//       success: false,
//       err: err.message,
//       stack: process.env.NODE_ENV === "production" ? null : err.stack,
//     });
//   }
// };
const errorHandler = (err, req, res, next) => {
  console.log(err)
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let errMsg = err.message;

  //if mongoose not found error, set 404 and change message
  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    errMsg = "Resource not found";
  }

  res.status(statusCode).json({
    errMsg: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
module.exports = {
  errorHandler,
  notFound,
}
