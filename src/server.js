// server.js
import express from "express";
import { connectMongoDB } from "./daos/mongodb/connection.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import userRouter from "./routes/userRouter.js";
import cookieParser from "cookie-parser";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/viewsRouter.js";
import session from "express-session";
import mongoStore from "connect-mongo";
import passport from "passport";
import './config/jwtStrategy.js'
import sessionRouter from "./routes/sessionRouter.js"

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SECRET_KEY));

app.engine("handlebars", handlebars.engine());
app.set("views","src/views");
app.set("view engine", "handlebars");

const sessionConfig = {
  secret: "sessionKey",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60000,
  },
  store: new mongoStore({
    mongoUrl: process.env.MONGODB_URI,
    ttl: 60,
  }),
};

app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());

app.use("/users", userRouter);
app.use("/", viewsRouter);
app.use("/api/sessions", sessionRouter);

app.use(errorHandler);

connectMongoDB()
  .then(() => console.log("Conectado a mongodb"))
  .catch((error) => console.log(error));

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
