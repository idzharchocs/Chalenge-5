const ApiError = require("../utils/apiErrors");
const { User } = require("../models");

const checkId = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return next(new ApiError(`User not found`, 404));
    }

    if (user.id === req.user.id || req.user.role == "SuperAdmin") {
      next();
    } else {
      return next(
        new ApiError(`Can't accesss, you are not owner of this account`, 401)
      );
    }
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

module.exports = checkId;
