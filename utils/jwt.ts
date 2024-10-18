import * as jose from "jose";

interface JWT_Structure {
  id: Number;
  username: String;
}

const signature = new TextEncoder().encode(process.env.JWT_SECRET as string);
const alg = "HS256";

export async function generateJWT(
  id: number,
  username: string,
  surname: string
) {
    const jwt = await new jose.SignJWT({
    id: id,
    username: username,
    name: surname,
  })
    .setIssuedAt()
    .setExpirationTime("2h")
    .setProtectedHeader({ alg })
    .sign(signature);
  return jwt;
}

export async function verifyJWT(token: string) {
  var decoded = await jose.jwtVerify(token, signature);
  return decoded;
}
