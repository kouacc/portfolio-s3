import jsonwebtoken from "jsonwebtoken";

interface JWT_Structure {
  id: Number;
  username: String;
}

export function generateJWT(id: number, username: string, surname: string): string {
  return jsonwebtoken.sign(
    { id: id, username: username, name: surname },
    process.env.JWT_SECRET as string
  );
}

export function verifyJWT(token: string) {
  var decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET as string);
  return decoded;
}
