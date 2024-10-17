import * as jwt from "jsonwebtoken";

interface JWT_Structure {
  id: Number;
  username: String;
}

export function generateJWT(id: number, username: string): string {
  return jwt.sign(
    { id: id, username: username },
    process.env.JWT_TOKEN as string
  );
}

export function verifyJWT(token: string) {
  var decoded = jwt.verify(token, process.env.JWT_TOKEN as string);
  return decoded;
}
