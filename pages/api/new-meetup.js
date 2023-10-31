// ! API ROUTES
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// * All the files in the /api/ folder run on the server (backend) and nothing will be exposed to the client.
// Can use credentials here. Even though the folder exists in the /pages/ folder, no code is exposed to the client.

// todo: We do not create react components here. But only write the code(functions) which sends/receives API requests
// The URL(API Route) for this file will be /api/new-meetup
// Any request sent to this URL will trigger the function defined in here

function handler(req, res) {
  // Ensuring that only POST request will trigger this function
  if (req.method === "POST") {
    const data = req.body;
    console.log(data);
    // object destructuring
    const { title, image, address, description } = data;
  }
}

export default handler;
