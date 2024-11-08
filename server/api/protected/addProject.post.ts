import { db } from "#imports";
import { projectTable } from "~/database/schema";
import fs from 'node:fs';

export default defineEventHandler(async (event) => {
  // read the authorization header
  const authorization = event.headers.get('Authorization');
  if (!authorization) {
    return {
      status: 401,
      body: 'Unauthorized',
    }
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
      cover: formDataBody[6].filename,
      // get the filenames of the images, from formDataBody[7] to the end of the formdatabody array
      images: formDataBody.slice(7).map((image) => image.filename),
    }

    console.log(project);
    const [{ insertedId: id }] = await db.insert(projectTable).values(project).onConflictDoNothing().returning({ insertedId: projectTable.id });


    // use Nitro storage to save the cover and images
    const dirPath = `./public/content/${id}`;
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
    }

    fs.appendFile(`./public/content/${id}/${project.cover}`, formDataBody[6].data, (err) => {
      if (err) throw err;
    });

    formDataBody.slice(7).forEach((image) => {
      fs.appendFile(`./public/content/${id}/${image.filename}`, image.data, (err) => {
        if (err) throw err;
      })});
    
    

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
