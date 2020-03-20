const express = require("express");

const router = express.Router();

const authController = require("../controllers/authControllers");
const screamController = require("../controllers/screamController");

router.get("/screams", screamController.getAllScreams);
router.get("/scream/:screamId", screamController.getScream);
router.delete(
  "/scream/:screamId",
  authController.FBAuth,
  screamController.deleteScream
);
router.get(
  "/scream/:screamId/like",
  authController.FBAuth,
  screamController.likeScream
);
router.get(
  "/scream/:screamId/unlike",
  authController.FBAuth,
  screamController.unlikeScream
);
router.post(
  "/scream/:screamId/comment",
  authController.FBAuth,
  screamController.commentOnScream
);
router.post("/scream", authController.FBAuth, screamController.postOneScream);

module.exports = router;
