const ApiError = require("../utils/apiErrors");

const checkRole = (role, role2) => {
  return async (req, res, next) => {
    try {
      if (req.user.role == role || req.user.role == role2) {
        next();
      } else {
        next(new ApiError(`You are not admin, cannot access`, 401));
      }
    } catch (err) {
      next(new ApiError(err.message, 500));
    }
  };
};

module.exports = checkRole;
