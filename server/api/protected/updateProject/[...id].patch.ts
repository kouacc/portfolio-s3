import { db } from "#imports";
import { projectTable } from "~/database/schema";
import fs from "node:fs";
import { useAuthorization } from "~/server/composables/useAuthorization";

export default defineEventHandler(async (event) => {
  // read the authorization header
  const authorization = event.headers.get("Authorization");
  if (!authorization || !await useAuthorization(authorization)) {
    return {
      status: 401,
      body: "Unauthorized",
    };
  }

  const formDataBody = await readMultipartFormData(event);
  const id = Number(getRouterParam(event, "id"));
  const oldProject = await db.query.projectTable.findFirst({
    where: eq(projectTable.id, id),
  })

if (formDataBody) {
    const project = {
      title: formDataBody[0].data.toString(),
      content: formDataBody[1].data.toString(),
      year: formDataBody[2].data.toString(),
      status: formDataBody[3].data.toString() as
        | "Terminé"
        | "En cours"
        | "En pause"
        | "Abandonné",
      repository_link: formDataBody[4].data.toString(),
      tools: formDataBody[5].data.toString(),
      ...(formDataBody[6] && { cover: formDataBody[6].filename }),
      ...(formDataBody.length > 7 && { images: formDataBody.slice(7).map((image) => image.filename) })
    };

    //handle updating images
    const dirPath = `./public/content/${id}`;
    if (!fs.existsSync(dirPath)) {
            throw new Error("Project not found");
    }

    if (formDataBody[6] && project.cover && project.cover !== oldProject?.cover) {
                    const oldCoverPath = `./public/content/${id}/${oldProject?.cover}`;
                    if (fs.existsSync(oldCoverPath)) {
                            fs.unlink(oldCoverPath, (err) => {
                                    if (err) throw err;
                            });
                    }

                    // Write new cover
                    fs.appendFile(
                            `./public/content/${id}/${project.cover}`,
                            formDataBody[6].data,
                            (err) => {
                                    if (err) throw err;
                            }
                    );
        } else {
            console.log("No cover update needed")
        }
    
    await db.update(projectTable).set(project).where(eq(projectTable.id, id));
    return {
      status: 200,
      body: JSON.stringify({ id }),
    }
  }
});