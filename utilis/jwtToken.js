const genereateJwtTokenForBrowser = (user, res, statuCode, message) => {
  const token = user.generateToken();
  res
    .status(statuCode)
    .cookie('token', token, {
      expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      partitioned: true,
      path: '/'
    })
    .json({
      success: true,
      message,
      token,
      user,
    });
};

module.exports = { genereateJwtTokenForBrowser };
