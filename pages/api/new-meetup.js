// -> API ROUTES
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// ? All the files in the /api/ folder run on the server (backend) and nothing will be exposed to the client.
// Can use credentials here. Even though the folder exists in the /pages/ folder, no code is exposed to the client.

// -> We do not create react components here. But only write the code(functions) which sends/receives API requests
// The URL(API Route) for this file will be /api/new-meetup
// Any request sent to this URL will trigger the function defined in here

import { MongoClient } from "mongodb";

async function handler(req, res) {
  // Ensuring that only POST request will trigger this function
  if (req.method === "POST") {
    const data = req.body;
    console.log(data);

    // ! Never run such code on the client side as it would expose our username and password
    // But it is okay here, because this is server side code

    // returns a promise, so we can use async/await
    const client = await MongoClient.connect(
      "mongodb+srv://srivishp:Mongo123@cluster0.ttaoxto.mongodb.net/meetups?retryWrites=true&w=majority"
    );

    const db = client.db();

    // MongoDB is not a Document based DB, so it uses Collections instead of Tables
    const meetupsCollection = db.collection("meetups-collection");

    // In MongoDB, a document is just a JavaScript Object
    const result = await meetupsCollection.insertOne({ data });

    console.log(result);

    // closes the connection with database
    client.close();

    res.status(201).json({ message: "Meetup Inserted" });
  }
}

export default handler;
