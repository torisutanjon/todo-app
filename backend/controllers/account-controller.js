import { USER_ACCOUNT_MODEL } from "../models/Account.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export default {
  createAccount: async (req, res) => {
    try {
      bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT), (err, salt) => {
        if (err) {
          console.log(err);
          return res.status(500).send({ message: "Internal Server Error" });
        }
        bcrypt.hash(req.body.password, salt, async (err, hash) => {
          if (err) {
            console.log(err);
            return res.status(500).send({ message: "Internal Server Error" });
          }
          await USER_ACCOUNT_MODEL.create({
            username: req.body.username,
            password: hash,
          });
        });
      });

      return res.status(201).send({ message: "Account Created Successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  },
  loginAccount: async (req, res) => {
    try {
      const user = await USER_ACCOUNT_MODEL.findOne({
        username: req.body.username,
      });

      if (!user) return res.status(404).send({ message: "No user was found" });

      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).send({ message: "Internal Server Error" });
        }

        if (result === false) {
          return res.status(404).send({ message: "No user was found" });
        }

        const token = jwt.sign(
          {
            userid: user._id,
            username: user.username,
          },
          process.env.SECRET_KEY
        );

        return res
          .status(200)
          .send({ message: "Logged In Successfully", token: token });
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  },
};
