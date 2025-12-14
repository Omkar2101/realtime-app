import jwt from "jsonwebtoken";

const SECRET = "SUPER_SECRET_KEY"; // later move to env

export function verifyToken(token) {
  return jwt.verify(token, SECRET);
}
