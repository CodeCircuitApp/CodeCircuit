const express = require("express");
const eventSchema = require("../schemas/event");
const querySchema = require("../schemas/query");
const { generateFilters } = require("../utilities/filters");

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
  const size = parseInt(req.query.size) || 15;
  const page = parseInt(req.query.page) || 1;

  try {
    const skip = (page - 1) * size;

    if (req.query.type && typeof req.query.type === "string") {
      req.query.type = req.query.type.split(",");
    }
    if (req.query.locationType && typeof req.query.locationType === "string") {
      req.query.locationType = req.query.locationType.split(",");
    }
    if (
      req.query.educationStatus &&
      typeof req.query.educationStatus === "string"
    ) {
      req.query.educationStatus = req.query.educationStatus.split(",");
    }

    const { error, value } = querySchema.validate(req.query);
    if (error) {
      return res.status(400).json({ error: error.toString() });
    }

    const filters = generateFilters(value);

    const events = await db
      .collection("events")
      .find(filters)
      .skip(skip)
      .limit(size)
      .toArray();

    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

exports.eventsRouter = router;
