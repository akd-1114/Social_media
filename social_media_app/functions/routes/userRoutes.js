const express = require("express");

const router = express.Router();

const authController = require("../controllers/authControllers");
const userController = require("../controllers/userController");

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.post("/image", authController.FBAuth, userController.uploadImage);
router.post("/details", authController.FBAuth, userController.addUsersDetails);
router.get(
  "/details",
  authController.FBAuth,
  userController.getAuthenticatedUsers
);

router.get("/:handle", userController.getUserDetails);
router.post(
  "/notifications",
  authController.FBAuth,
  userController.markNotificationsRead
);

module.exports = router;
