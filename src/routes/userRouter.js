// userRouter.js
import { Router } from "express";
import { userController } from "../controllers/userController.js";
import passport from "passport";
import { checkRole } from "../middlewares/checkRole.js";
import { passportCall } from '../middlewares/passport-call.js'


const router = Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/private-headers", passport.authenticate("jwt"), (req, res) => res.send(req.user));
router.get("/private-cookies",passport.authenticate("jwt-cookies"),(req, res) => res.send(req.user));
router.get("/private-cookies-admin",passport.authenticate("jwt-cookies"),checkRole("admin"),(req, res) => res.send(req.user));
router.get('/profile', passportCall('jwt', { session: false }), userController.profile);


router.get("/", userController.getAll);
router.get("/:id", userController.getById);
router.post("/", userController.create);
router.put("/:id", userController.update);
router.delete("/:id", userController.delete);

export default router;
