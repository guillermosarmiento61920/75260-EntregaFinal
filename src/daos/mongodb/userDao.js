// userDao.js
import { UserModel } from "./models/user.model.js";
import MongoDao from "./mongoDao.js";

class UserDaoMongo extends MongoDao {
    constructor(model) {
        super(model);
    }
    getByEmail = async (email) => {
        try {
          return await this.model.findOne({ email }).populate("cart").lean();
        } catch (error) {
          throw new Error(error);
        }
      };
}

export const userDao = new UserDaoMongo(UserModel);