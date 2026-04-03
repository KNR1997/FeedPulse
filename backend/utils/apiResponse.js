export const successResponse = (
  res,
  data = null,
  message = "Success",
  status = 200,
) => {
  return res.status(status).json({
    success: true,
    data,
    message,
    error: null,
  });
};

export const errorResponse = (
  res,
  message = "Something went wrong",
  status = 500,
  error = null,
) => {
  return res.status(status).json({
    success: false,
    data: null,
    message,
    error,
  });
};
