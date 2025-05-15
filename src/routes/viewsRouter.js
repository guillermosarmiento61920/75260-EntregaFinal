// viewsRouter.js
import { Router } from "express";
import productRouter from "./product-router.js";
import userRouter from "./user-router.js";
import cartRouter from "./cart-router.js";
import ticketRouter from "./ticket-router.js";

const router = Router()

router.get('/', (req, res) => {
    res.render('login')
})

router.get("/registro", (req, res) => {
    res.render("registro");
});

router.get("/errorRegistro", (req, res) => {
    res.render("errorRegistro");
});

router.get("/errorLogin", (req, res) => {
    res.render("errorLogin");
});

router.get("/perfil", (req, res) => {
    if (!req.user) return res.redirect("/errorLogin");

    res.render("perfil", { user: req.user });
});

// export default class MainRouter {
//   constructor() {
//     this.router = Router();
//     this.init();
//   }

//   init() {
//     this.router.use("/products", productRouter);
//     this.router.use("/users", userRouter);
//     this.router.use("/carts", cartRouter);
//     this.router.use("/ticket", ticketRouter);
//   }

//   getRouter() {
//     return this.router;
//   }
// }

// export const apiRouter = new MainRouter();



export default router
