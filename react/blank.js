const express = require('express');
const app = express();
const port = 3001;

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://derek:mongo@cluster0.lvo6cnu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    const db = client.db('testdb');
    const teamMembers = db.collection('TeamMembers');

    app.get('/dynamic', async (req, res) => {
      res.send(JSON.stringify(teamMembers));
    });

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
  }
}
run().catch(console.dir);