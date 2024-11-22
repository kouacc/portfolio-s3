import { db } from "../utils/orm";
import { userTable } from "~/database/schema";
import { eq } from "../utils/orm";
import crypto from 'crypto'

export default defineEventHandler(async (event) => {
    const formData = await readFormData(event);
    const username = formData.get("username") as string;
    const name = formData.get("name") as string;
    const password = formData.get("password") as string;
    var salt = crypto.randomBytes(16)
    const hashed_password = crypto.pbkdf2Sync(password as string, salt, 310000, 32, 'sha256')

    const authorization = event.headers.get('Authorization');
    if (!authorization) {
        if (await db.$count(userTable) >= 1) {
            return {
                status: 401,
                body: 'Unauthorized',
            }
        } else {
            await db.insert(userTable).values({ username: username, name: name, password_hash: hashed_password, salt: salt, })
        }
    } else {
        await db.insert(userTable).values({ username: username, name: name, password_hash: hashed_password, salt: salt, })
    }

});
