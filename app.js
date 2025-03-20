require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const { eventsRouter } = require("./routes/events");

const app = express();
const port = 3000;

const client = new MongoClient(process.env.MONGO_URI);

async function run() {
  try {
    await client.connect();
    app.locals.db = client.db("code_circuit");
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch {
    await client.close();
  }
}
run().catch(console.dir);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello, World!" });
});

app.use("/events", eventsRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
