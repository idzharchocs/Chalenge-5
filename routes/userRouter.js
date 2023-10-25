const router = require("express").Router();

const User = require("../controllers/userController");

const authenticate = require("../middleware/authenticate");
const checkRole = require("../middleware/checkRole");
const checkId = require("../middleware/checkId");

router.get("/", authenticate, User.findUsers);
router.get("/:id", authenticate, User.findUserById);

router.patch(
  "/admin/:id",
  authenticate,
  checkRole("SuperAdmin"),
  checkId,
  User.updateUser
);
router.patch("/member/:id", authenticate, checkId, User.updateUser);

router.delete(
  "/admin/:id",
  authenticate,
  checkRole("SuperAdmin"),
  checkId,
  User.deleteUser
);
router.delete("/member/:id", authenticate, checkId, User.deleteUser);

module.exports = router;
