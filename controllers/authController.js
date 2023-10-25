const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Auth, User } = require("../models");
const ApiError = require("../utils/apiErrors");

const register = async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword, age, address } = req.body;

    // validasi untuk check apakah email nya udah ada
    const user = await Auth.findOne({
      where: {
        email,
      },
    });

    if (user) {
      next(new ApiError("User email already taken", 400));
    }

    // minimum password length
    const passwordLength = password <= 8;
    if (passwordLength) {
      next(new ApiError("Minimum password must be 8 character", 400));
    }

    // confirm password
    if (password !== confirmPassword) {
      next(new ApiError("password does not match", 400));
    }

    // hashing password
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    const hashedConfirmPassword = bcrypt.hashSync(confirmPassword, saltRounds);

    if (req.user) {
      if (req.user.role == "SuperAdmin") {
        newUser = await User.create({
          name,
          address,
          age,
          role: "Admin",
        });
      }
    } else {
      newUser = await User.create({
        name,
        address,
        age,
      });
    }
    const test = await Auth.create({
      email,
      password: hashedPassword,
      confirmPassword: hashedConfirmPassword,
      userId: newUser.id,
    });

    console.log(test);

    res.status(201).json({
      status: "Success",
      data: {
        ...newUser,
        email,
        password: hashedPassword,
        confirmPassword: hashedConfirmPassword,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await Auth.findOne({
      where: {
        email,
      },
      include: ["User"],
    });

    if (user && bcrypt.compareSync(password, user.password)) {
      //   token utk autentikasi
      const token = jwt.sign(
        {
          id: user.userId,
          username: user.User.name,
          role: user.User.role,
          email: user.email,
        },
        process.env.JWT_SECRET
      );

      res.status(200).json({
        status: "Success",
        message: "Berhasil login",
        data: token,
      });
    } else {
      next(new ApiError("Wrong password or user does not exist", 400));
    }
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const authenticate = (req, res) => {
  try {
    res.status(200).json({
      status: "Success",
      data: {
        user: req.user,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

module.exports = {
  register,
  login,
  authenticate,
};
