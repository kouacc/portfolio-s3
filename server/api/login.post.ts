import { db } from '../utils/orm';
import { userTable } from "~/database/schema";
import { eq } from '../utils/orm';
import { generateJWT } from '../utils/jwt';
import crypto from 'crypto'

export default defineEventHandler(async (event) => {
    const formData = await readFormData(event)
    const username = formData.get("username") as string
    const password = formData.get("password") as string

    const user = await db.query.userTable.findFirst({
        where: eq(userTable.username, username)
    })

    if (!user || !user.salt) {
        return {
            "status": 401,
            "body": "Nom d'utilisateur invalide."
        }
    }

    const hash = crypto.pbkdf2Sync(password, user.salt, 310000, 32, 'sha256')

    if (Buffer.compare(hash, Buffer.from(user.password_hash)) === 0) {
        const token = generateJWT(user.id, user.username, user.name)
        const cookie = setCookie(event, 'token', token)
        // return cookie
        return cookie
    } else {
        return {
            "status": 401,
            "body": "Mot de passe invalide."
        }
    }
    
});
