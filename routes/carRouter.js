
const router = require("express").Router();

const Car = require("../controllers/carController");

const upload = require("../middleware/uploader");
const authenticate = require("../middleware/authenticate");
const checkRole = require("../middleware/checkRole");

router.post(
  "/",
  authenticate,
  checkRole("Admin", "SuperAdmin"),
  upload.single("image"),
  Car.createCar
);
router.get("/", authenticate, Car.findCars);
router.get("/:id", Car.findCarById);
router.patch(
  "/:id",
  authenticate,
  checkRole("Admin", "SuperAdmin"),
  upload.single("image"),
  Car.updateCar
);
router.delete(
  "/:id",
  authenticate,
  checkRole("Admin", "SuperAdmin"),
  Car.deleteCar
);

module.exports = router;
