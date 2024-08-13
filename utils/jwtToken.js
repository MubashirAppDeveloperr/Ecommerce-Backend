const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    sameSite: "lax",
  };
  // res.setHeader("Access-Control-Allow-Credentials", true);
  // res.setHeader(
  //   "Access-Control-Allow-Headers",
  //   "Origin, X-Requested-With, Content-Type, Accept, authorization"
  // );
  // res.setHeader("Content-Type", "application/json");
  // res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  // res.setHeader(
  //   "Access-Control-Allow-METHODS",
  //   "GET, HEAD, POST, PUT, DELETE, TRACE, OPTIONS, PATCH"
  // );

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};
export default sendToken;
