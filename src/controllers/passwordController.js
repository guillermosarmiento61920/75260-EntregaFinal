// passwordController.js
import jwt from "jsonwebtoken";
import { userDao } from "../daos/mongodb/userDao.js";
import { transporter } from "../services/emailService.js";
import { createHash, isValidPassword } from "../utils/userUtils.js";
import "dotenv/config";

const secret = process.env.JWT_SECRET;

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await userDao.getByEmail(email);
    if (!user) return res.status(404).render("error", { status: 404, message: "Usuario no encontrado" });

    const token = jwt.sign({ email: user.email }, secret, { expiresIn: "1h" });

    const resetLink = `${req.protocol}://${req.get("host")}/users/reset-password/${token}`;

    await transporter.sendMail({
      from: process.env.USER_GOOGLE,
      to: user.email,
      subject: "Restablecer contraseña",
      html: `
        <h2>Restablecer tu contraseña</h2>
        <p>Haz clic en el siguiente botón para cambiar tu contraseña:</p>
        <a href="${resetLink}">
          <button>Restablecer Contraseña</button>
        </a>
        <p>Este enlace expirará en 1 hora.</p>
      `,
    });

    res.status(200).send("Email enviado con instrucciones.");
  } catch (error) {
    next(error);
  }
};

export const renderResetPassword = async (req, res) => {
  const { token } = req.params;
  try {
    jwt.verify(token, secret);
    res.render("resetPassword", { token });
  } catch (error) {
    return res.status(400).render("error", { status: 400, message: "Enlace expirado o inválido" });
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const payload = jwt.verify(token, secret);
    const user = await userDao.getByEmail(payload.email);
    if (!user) return res.status(404).render("error", { status: 404, message: "Usuario no encontrado" });

    const samePassword = isValidPassword(password, user.password);
    if (samePassword) return res.status(400).render("error", { status: 400, message: "No puedes usar la misma contraseña anterior" });

    const newHashed = createHash(password);
    await userDao.update(user._id, { password: newHashed });

    res.send("Contraseña actualizada correctamente. Puedes iniciar sesión.");
  } catch (error) {
    next(error);
  }
};

