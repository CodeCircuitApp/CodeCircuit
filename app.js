require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const { eventsRouter } = require("./routes/events");
const { error } = require("./schemas/event");

const app = express();
const port = 3000;

const client = new MongoClient(process.env.MONGO_URI);

async function connect() {
  console.log("Connecting to MongoDB...");
  try {
    await client.connect();
    app.locals.db = client.db("code_circuit");
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch {
    console.log("Failed to connect to MongoDB!");
    await client.close();
  }
}
connect().catch(console.dir);

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

app.listen(port, "0.0.0.0", () => {
  console.log(`Example app listening on port ${port}`);
});
