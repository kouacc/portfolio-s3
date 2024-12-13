import { db } from "#imports";
import { userTable } from "~/database/schema";
import crypto from "crypto";
import { useAuthorization } from "~/server/composables/useAuthorization";
import { verifyJWT } from "~/utils/jwt";
import { JWT } from "~/pages/admin/index.vue";
import { useDiscordWebhook } from "~/server/composables/useDiscordWebhook";

export default defineEventHandler(async (event) => {
  // read the authorization header
  const authorization = event.headers.get("Authorization");
  if (!authorization || !(await useAuthorization(authorization))) {
    return {
      status: 401,
      body: "Unauthorized",
    };
  }

  //check username from token
  const payload: JWT = await verifyJWT(authorization);
  const payload_username = payload.payload.username;

  // get the form data
  const data = await readFormData(event);
  const form = {
    oldpassword: data.get("oldpassword") as string,
    newpassword: data.get("newpassword") as string,
  }

  const user = await db.query.userTable.findFirst({
    where: eq(userTable.username, payload_username),
  });

  if (!user) {
    return {
      status: 401,
      body: "Unauthorized",
    };
  }

  // compare old password with the one in the db
  const old_hash = crypto.pbkdf2Sync(form.oldpassword, user.salt, 310000, 32, "sha256");
  
  if (Buffer.compare(old_hash, Buffer.from(user.password_hash)) !== 0) {
    return {
      status: 401,
      body: "Ancien mot de passe incorrect",
    };
  }

  // update the password
  const new_salt = crypto.randomBytes(16);
  const new_hash = crypto.pbkdf2Sync(form.newpassword, new_salt, 310000, 32, "sha256");

  await db.update(userTable).set({ password_hash: new_hash, salt: new_salt}).where(eq(userTable.username, payload_username));

  useDiscordWebhook([
    {
      title: "Mot de passe changé",
      type: "rich",
      description: `Compte affecté : ${payload_username}`,
      color: 0x3680f7,
      footer: {
        text: "Logs - Portfolio",
      },
      timestamp: new Date(),
    },
  ]);

  return {
    status: 200,
    body: "Mot de passe mis à jour",
  };
});
