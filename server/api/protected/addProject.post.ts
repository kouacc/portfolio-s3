export default defineEventHandler(async (event) => {
  // read the authorization header
  const authorization = event.headers.get('Authorization');
  if (!authorization) {
    return {
      status: 401,
      body: 'Unauthorized',
    }
  }

  const formDataBody = await readFormData(event);
  console.log(formDataBody);
  // write images to the file system
  // follow the following path: /public/images/${projectId}/${imageFileName}
  formDataBody.getAll('images').forEach((image) => {
    console.log(image.name);
  })
    



  /* if (formDataBody) {
    const title = formDataBody[0].data.toString()
    const content = formDataBody[1].data.toString()
    const year = formDataBody[2].data.toString()
    const status = formDataBody[3].data.toString()
    const repository_link = formDataBody[4].data.toString()
    const tools = formDataBody[5].data.toJSON()

    //cover and images


    console.log(title, content, year, repository_link, tools)

    
  } */
});
