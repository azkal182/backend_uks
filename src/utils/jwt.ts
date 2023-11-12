import jwt from "jsonwebtoken";
function generateAccessToken(data:any) {
    return jwt.sign(data, process.env.TOKEN_SECRET||"secret", { expiresIn: '1800s' });
  }


  export {
    generateAccessToken
  }
