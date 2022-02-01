exports.getPrivateRoute = (req, res, next) => {
  console.log(req.user);
  res.status(200).json({
    success: true,
    data: 'You have access to this data',
    user: req.user.firstName,
  });
};
