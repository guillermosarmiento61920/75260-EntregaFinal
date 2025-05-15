// checkRole.js
import CustomError from "../utils/custom-error.js";


export const checkRole = (role) => {
    return async (req, res, next) => {
      if (!req.user) {
        return res.status(401).send({ status: "error", error: "Unauthorized" });
      }

      if (req.user.role !== role) {
        return res
          .status(403)
          .send({ status: "error", error: "You do not have permissions" });
      }
      
          next()
    };
  };
  

  // export const checkRole = (roles = []) => {
  //   return async (req, res, next) => {
  //     try {
  //       if (!req.user) throw new CustomError("No autorizado", 401);
  //       if (!roles.includes(req.user.role))
  //         throw new CustomError("No tiene permisos para acceder a este recurso", 403);
  //       next();
  //     } catch (error) {
  //       next(error);
  //     }
  //   };
  // };
  