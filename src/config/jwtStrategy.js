// jwtStrategy.js
import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { userService } from "../services/userService.js";
import "dotenv/config";

const verifyToken = async (jwt_payload, done) => {
  if (!jwt_payload) return done(null, false, { messages: "Invalid Token" });
  return done(null, jwt_payload);
};

const cookieExtractor = (req) => {
  return req.cookies.token;
};

const strategyConfigCurrent = {
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use("current", new Strategy(strategyConfigCurrent, verifyToken));

const strategyConfigCookies = {
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: process.env.JWT_SECRET
};

passport.use('jwt-cookies', new Strategy(strategyConfigCookies, verifyToken));

