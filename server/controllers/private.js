exports.getPrivateRoute = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: 'You have access to this data',
    user: req.user.firstName,
  });
};
