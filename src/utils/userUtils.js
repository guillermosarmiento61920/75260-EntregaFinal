// userUtils.js
import bcrypt from "bcrypt";

export const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

export const isValidPassword = (password, passwordHash) => {
  return bcrypt.compareSync(password, passwordHash);
}; 

export const createResponse = (res, statusCode, data) => {
        return res.status(statusCode).json({data})
}

