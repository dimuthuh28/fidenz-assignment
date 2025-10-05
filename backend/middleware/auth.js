const { checkJwt } = require('../config/auth0');

const requireAuth = (req, res, next) => {
  checkJwt(req, res, (err) => {
    if (err) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized',
        message: 'Valid authentication token required'
      });
    }
    next();
  });
};

module.exports = { requireAuth };