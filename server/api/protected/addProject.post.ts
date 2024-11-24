import { db } from "#imports";
import { projectTable } from "~/database/schema";
import fs from 'node:fs';
import { useAuthorization } from "~/server/composables/useAuthorization";

export default defineEventHandler(async (event) => {
  // read the authorization header
  const authorization = event.headers.get('Authorization');
  if (!authorization || !(await useAuthorization(authorization))) {
    return {
      status: 401,
      body: "Unauthorized",
    };
  }

  const formDataBody = await readMultipartFormData(event);
  
  if (formDataBody) {
    const project = {
      title: formDataBody[0].data.toString(),
      content: formDataBody[1].data.toString(),
      year: formDataBody[2].data.toString(),
      status: formDataBody[3].data.toString() as "Terminé" | "En cours" | "En pause" | "Abandonné",
      repository_link: formDataBody[4].data.toString(),
      tools: formDataBody[5].data.toString(),
      cover: formDataBody[6]?.filename || null,
      images: formDataBody.slice(7)?.map((image) => image.filename) || [],
    }

    const [{ insertedId: id }] = await db.insert(projectTable).values(project).onConflictDoNothing().returning({ insertedId: projectTable.id });


    // use Nitro storage to save the cover and images
    if (project.cover || project.images.length > 0) {
      const dirPath = `./public/content/${id}`;
      //check if content folder exists, if not create it
      
      if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      }

      if (project.cover && formDataBody[6]) {
      fs.appendFile(`./public/content/${id}/${project.cover}`, formDataBody[6].data, (err) => {
        if (err) throw err;
      });
      }

      if (project.images.length > 0) {
      formDataBody.slice(7).forEach((image) => {
        fs.appendFile(`./public/content/${id}/${image.filename}`, image.data, (err) => {
        if (err) throw err;
        });
      });
      }
    }
    
    

    return {
      status: 200,
      body: JSON.stringify({ id }),
    }
    
  } else {
    return {
      status: 400,
      body: 'Bad request',
    }
  }
});
