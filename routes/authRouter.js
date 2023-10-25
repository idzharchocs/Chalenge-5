const router = require("express").Router();

const Auth = require("../controllers/authController");
const authenticate = require("../middleware/authenticate");
const checkRole = require("../middleware/checkRole");

router.post("/superadmin/login", Auth.login);

router.post(
  "/admin/register",
  authenticate,
  checkRole(["SuperAdmin"]),
  Auth.register
);
router.post("/admin/login", Auth.login);

router.post("/member/register", Auth.register);
router.post("/member/login", Auth.login);

router.get("/me", authenticate, Auth.authenticate);

module.exports = router;
