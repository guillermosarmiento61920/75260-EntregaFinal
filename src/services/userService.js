// userService.js
import { userDao } from "../daos/mongodb/userDao.js";
import CustomError from "../utils/customError.js";
import { createHash, isValidPassword } from "../utils/userUtils.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

class UserService {
  constructor(dao) {
    this.dao = dao;
  }

register = async (body) => {
    try {
      const { email, password, ...rest } = body;
      const existUser = await this.dao.getByEmail(email);
      if (existUser) throw new CustomError("El usuario ya existe", 400);

      console.log("[DEBUG] Contraseña recibida:", password);

      const hashedPassword = createHash(password)
      console.log("contra hasheada", hashedPassword);

const userData = {
  ...rest,
  email,
  password: hashedPassword
};
console.log("[DEBUG FIX] Datos a guardar:", userData);

      const response = await this.dao.create(userData);
      if (!response) throw new CustomError("Error al registrar usuario", 400);

      console.log("[DEBUG] Usuario guardado en DB:", response);

      return response;
    } catch (error) {
      throw error;
    }
  };

  login = async (email, password) => {
     try {
       const userExist = await this.dao.getByEmail(email);
       if (!userExist) throw new CustomError("Credenciales incorrectas", 400);
       const passValid = isValidPassword(password, userExist.password);
       if (!passValid) throw new CustomError("Credenciales incorrectas", 400);
       return userExist;
     } catch (error) {
       throw error;
     }
   };

generateToken = (user) => {
    const payload = {
      _id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role,
    };
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "20m",
    });
  };

  getAll = async () => {
    try {
      return await this.dao.getAll();
    } catch (error) {
      throw new Error(error);
    }
  };

  getById = async (id) => {
    try {
      const response = await this.dao.getById(id);
      if (!response) throw new CustomError("Product not found", 404);
      return response;
    } catch (error) {
      throw error;
    }
  };

  create = async (body) => {
    try {
      const response = await this.dao.create(body);
      if (!response) throw new CustomError("Error creating product", 404);
      return response;
    } catch (error) {
      throw(error);
    }
  };

  update = async (id, body) => {
    try {
      const response = await this.dao.update(id, body);
      if (!response) throw new CustomError("Product not found", 404);
      return response;
    } catch (error) {
      throw(error);
    }
  };

  delete = async (id) => {
    try {
      const response = await this.dao.delete(id);
      if (!response) throw new CustomError("Product not found", 404);
      return response;
    } catch (error) {
      throw(error);
    }
  };
}

export const userService = new UserService(userDao);
