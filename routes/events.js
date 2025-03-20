const express = require("express");
const eventSchema = require("../schemas/event");

const router = express.Router();

router.post("/", async (req, res) => {
  const { db } = req.app.locals;
  const { error, value } = eventSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.toString() });
  }

  const event = {
    ...value,
    date: new Date(value.date),
  };

  try {
    const result = await db.collection("events").insertOne(event);

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

router.get("/", async (req, res) => {
  const { db } = req.app.locals;

  try {
    const events = await db.collection("events").find().toArray();

    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

exports.eventsRouter = router;
