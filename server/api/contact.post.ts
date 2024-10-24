import { db } from "#imports";
import { useFetch } from "nuxt/app";
import { contactTable } from "~/database/schema";

export default defineEventHandler(async (event) => {
  const form = await readFormData(event);

  const name = form.get("name") as string;
  const surname = form.get("surname") as string;
  const email = form.get("email") as string;
  const message = form.get("message") as string;

  //envoi db
  await db.insert(contactTable).values({
    name: name,
    surname: surname,
    email: email,
    message: message
  })

  
});
