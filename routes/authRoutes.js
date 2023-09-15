import express from "express";
import {
  registerController,
  loginController,
  forgotPasswordController,
  test,
  updateProfileController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

/*Routings*/

// register|| post
router.post("/register", registerController);

//login || post
router.post("/login", loginController);

//forgot-password || post

router.post("/forgot-password", forgotPasswordController);

//test
router.get("/test", requireSignIn, isAdmin, test);

//private protected route
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
//private protected route for admin
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//update profile
router.post("/profile", requireSignIn, updateProfileController);
export default router;
