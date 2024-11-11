import express from "express";
import {
  register,
  login,
  authMiddleware,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/admin", authMiddleware(["admin"]), (req, res) => {
  res.send("Admin access only");
});

export default router;
