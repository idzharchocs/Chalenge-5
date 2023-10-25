const jwt = require("jsonwebtoken");
const { User, Auth } = require("../models");
const ApiError = require("../utils/apiErrors");

module.exports = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) {
      return next(new ApiError("Token is missing", 401));
    }

    const token = bearerToken.split("Bearer ")[1];

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(payload.id, {
      include: ["Auth"],
    });

    req.user = user;
    next();
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};
