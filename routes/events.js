const express = require("express");

const router = express.Router();

router.post("/", async (req, res) => {
  const { db } = req.app.locals;
  const { name, date } = req.body;

  try {
    const result = await db.collection("events").insertOne({ name, date });

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

exports.eventsRouter = router;
