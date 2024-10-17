import { db } from "../utils/orm";
import { userTable } from "~/database/schema";
import { eq } from "../utils/orm";
import crypto from 'crypto'

export default defineEventHandler(async (event) => {
    var salt = crypto.randomBytes(16)
    const hashed_password = crypto.pbkdf2Sync(process.env.ADMIN_PASSWORD as string, salt, 310000, 32, 'sha256')

    await db.insert(userTable).values({ username: "kouacc", password_hash: hashed_password, salt: salt, })
});
