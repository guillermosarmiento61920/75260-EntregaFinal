// userController.js
import { userService } from "../services/userService.js";
// import { createResponse } from "../utils.js";


class UserController {
  constructor(service) {
    this.service = service;
  }

  register = async (req, res, next) => {
    try {
      const data = await this.service.register(req.body);
            // createResponse(res, 201, data);
      
      if (req.accepts("html")) return res.redirect("/");
      res.status(201).json({ message: "Usuario registrado correctamente" });
    } catch (error) {
      next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await this.service.login(email, password);
      const token = this.service.generateToken(user);
      res.cookie("token", token, { httpOnly: true }).json({ user, token });
    } catch (error) {
      next(error);
    }
  };

  profile = async (req, res, next) => {
      try {
        const { id } = req.user;
        const user = await this.service.getUserById(id);
        createResponse(res, 200, user);
      } catch (error) {
        next(error);
      }
    };

// deberia borrar todo desde aqui

  getAll = async (req, res, next) => {
    try {
      const response = await this.service.getAll();
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await this.service.getById(id);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const response = await this.service.create(req.body);
      if (!response) return res.redirect("/errorRegistro");
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await this.service.update(id, req.body);
      if (!response) return res.status(404).json({ message: "Usuario no encontrado" });
      res.status(200).json(response);

    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await this.service.delete(id);
      if (!response) return res.status(404).json({ message: "Usuario no encontrado" });
      res.status(200).json(response);

    } catch (error) {
      next(error);
    }
  };
}

export const userController = new UserController(userService)

