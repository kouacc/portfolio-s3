import { db } from "#imports";
import { useFetch } from "nuxt/app";
import { contactTable } from "~/database/schema";
import { useDiscordWebhook } from "../composables/useDiscordWebhook";

export default defineEventHandler(async (event) => {
  const form = await readFormData(event);

  const name = form.get("lastname") as string;
  const surname = form.get("firstname") as string;
  const email = form.get("email") as string;
  const message = form.get("message") as string;

  //envoi webhook
  useDiscordWebhook([
        {
          title: "Nouveau contact",
          type: "rich",
          description: `Nom : ${name}\nPrénom : ${surname}\nEmail : ${email}\nMessage : ${message}`,
          color: 0x3680f7,
          footer: {
            text: "Logs - Portfolio",
          },
          timestamp: new Date(),
        },
      ])

  //envoi db
  await db.insert(contactTable).values({
    name: name,
    surname: surname,
    email: email,
    message: message
  })

  
});
