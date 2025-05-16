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

  if (!email || !password) throw new CustomError("Faltan campos obligatorios", 400);

    try {
      const { email, password, ...rest } = body;
      const existUser = await this.dao.getByEmail(email);
      if (existUser) throw new CustomError("El usuario ya existe", 400);

      const hashedPassword = createHash(password)
      console.log("contra hasheada", hashedPassword);

const userData = {
  ...rest,
  email,
  password: hashedPassword
};
      const response = await this.dao.create(userData);
      if (!response) throw new CustomError("Error al registrar usuario", 400);

      return response;
    } catch (error) {
      throw error;
    }
  };

  login = async (email, password) => {

if (!email || !password) throw new CustomError("Faltan credenciales", 400);

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
      if (!response) throw new CustomError("No encontrado", 404);
      return response;
    } catch (error) {
      throw error;
    }
  };

  create = async (body) => {
    try {
      const response = await this.dao.create(body);
      if (!response) throw new CustomError("Error creando producto", 404);
      return response;
    } catch (error) {
      throw(error);
    }
  };

  update = async (id, body) => {
    try {
      const response = await this.dao.update(id, body);
      if (!response) throw new CustomError("No encontrado", 404);
      return response;
    } catch (error) {
      throw(error);
    }
  };

  delete = async (id) => {
    try {
      const response = await this.dao.delete(id);
      if (!response) throw new CustomError("No encontrado", 404);
      return response;
    } catch (error) {
      throw(error);
    }
  };

  getUserById = async (id) => {
  try {
    return await this.dao.getUserById(id);
  } catch (error) {
    throw new CustomError("Usuario no encontrado", 404);
  }
};
}

export const userService = new UserService(userDao);

