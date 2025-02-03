import express from 'express'
import path from 'path'
import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

const db = new MongoClient(process.env.MONGO_URI)

const __dirname = path.resolve();

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

async function connectToDB() {
  try {
    await db.connect();
    /*
    const database = db.db('logs');
    const logs = database.collection('nameAgeLogs');
    const query = { name: 'Axiu' };
    const log = await logs.findOne(query);
    console.log(log);
    */
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }
}

connectToDB();
