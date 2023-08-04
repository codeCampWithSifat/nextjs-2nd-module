const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://NEXTJS_SERVER:qZXpZtiMtSFXm3Ml@cluster0.qahuo.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run2(req, res) {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("NEXTJS_SERVER").collection("news");
    const newsCollection = client.db("NEXTJS_SERVER").collection("news");

    if (req.method === "GET") {
      const { newsId } = req.query;
      const query = { _id: new ObjectId(newsId) };
      const result = await newsCollection.findOne(query);
      res.send(result);
    }

    if (req.method === "DELETE") {
      const { newsId } = req.query;
      const query = { _id: new ObjectId(newsId) };
      const result = await newsCollection.deleteOne(query);
      res.send(result);
    }
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
// run().catch(console.dir);
export default run2;
