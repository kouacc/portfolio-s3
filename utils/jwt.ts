import * as jose from "jose";

interface JWT_Structure {
  id: Number;
  username: String;
}

const signature = new TextEncoder().encode(process.env.JWT_SECRET as string);

export async function generateJWT(
  id: number,
  username: string,
  surname: string
) {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  } else {
    const payload = { id: id, username: username, surname: surname };
    const jwt = await new jose.SignJWT(payload)
    .setIssuedAt()
    .setExpirationTime("2h")
    .setProtectedHeader({ alg: "HS256" })
    .sign(signature)
  return jwt;
  }
}

export async function verifyJWT(token: string) {
  var decoded = await jose.jwtVerify(token, signature);
  return decoded;
}
