// checkRole.js
import CustomError from "../utils/custom-error.js";


export const checkRole = (role) => {
    return async (req, res, next) => {
      if (!req.user || !roles.includes(req.user.role)) {
        return res.status(401).send({ status: "error", error: "No autorizado" });
      }

      if (req.user.role !== role) {
        return res
          .status(403)
          .send({ status: "error", error: "No tiene permisos para acceder a este recurso" });
      }
      
          next()
    };
  };
  
 