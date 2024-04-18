import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const authServices = {
  //passwordEncryption
   encryptPassword : async (password) => {
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    return password;
  },

  //generate token

   generateToken : async (payload) => {
    if (process.env.JWT_TOKEN_KEY) {
      const token = await jwt.sign({ payload }, process.env.JWT_TOKEN_KEY, {
        expiresIn: "5d",
      });
      return token;
    } else {
      throw new Error("JWT_TOKEN_KEY is undefined");
    }
  },
  //comparePassword

 comparePassword : async (password, hasedPassword) => {
    return await bcrypt.compare(password, hasedPassword);
  },

   verifyToken : (token) => {
    if (process.env.JWT_TOKEN_KEY) {
        
        const isVerify =  jwt.verify(token, process.env.JWT_TOKEN_KEY)
        return isVerify;
    }
},
};