// sessionRouter.js
import { Router } from "express";
import passport from "passport";
import UserDTO from "../dto/userDto";

const router = Router();

router.get(
  "/current",
  passport.authenticate("current", { session: false }),
  (req, res) => {
    const safeUser = new UserDTO(req.user);
    res.status(200).json({
      status: "success",
      user: req.user,
    });
  }
);

export default router;

