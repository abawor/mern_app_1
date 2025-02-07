import express from 'express'
import path from 'path'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected')) 
  .catch(err => console.log(err)); 
;

const Schema = mongoose.Schema;
const logSchema = new Schema({
  name: String,
  age: String,
});

const logsCollection = mongoose.model("nameAgeLogs", logSchema,"nameAgeLogs");

const __dirname = path.resolve();

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/logs', async (req, res) => {
  try {
    const logs = await logsCollection.find();
    res.json(logs);
  } catch (error) {
    console.error("Error fetching logs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"))
})
