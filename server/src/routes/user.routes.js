import multer from "multer";
import { registerUser, loginUser, logoutUser, allUsers, updateUser, updateUserAvatar, getUserProfile } from "../controllers/user.controllers.js";
import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();
const uploads = multer();

router.route("/register").post(uploads.none(), registerUser);
router.route("/login").post(uploads.none(), loginUser);
router.route("/logout").post(uploads.none(), verifyJWT, logoutUser);
router.route("/user").get(verifyJWT, allUsers);
router.route("/me").get(verifyJWT, getUserProfile);
router.route("/update-account").patch(verifyJWT, updateUser);

router.route("/avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar);

export default router;