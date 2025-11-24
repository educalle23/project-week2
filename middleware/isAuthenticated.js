function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
    return res.status(401).json({
        error: 'Unauthorized',
        message: 'You are not authorized to do this, please log in'
    });
}

module.exports = isAuthenticated;