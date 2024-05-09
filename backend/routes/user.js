import express from "express";

// This will help us connect to the database
import db from "../connection.js";

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

// The router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

// This section will help you get a list of all the records.
router.get("/", async (req, res) => {
  let collection = await db.collection("users");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// Check to see if user is in the database
router.post("/login", async (req, res) => {
  let collection = await db.collection("users");
  let query = { username: req.body.username, password: req.body.password };
  collection
    .find(query)
    .toArray()
    .then((data) => {
      if (data.length === 0) return res.send("Not found").status(404);
      else return res.send(data).status(200);
    });
});

// check to see if the username is taken
router.post("/", async (req, res) => {
  let collection = await db.collection("users");
  let query = { username: req.body.username };
  collection
    .find(query)
    .toArray()
    .then((data) => {
      res.send(data).status(200);
    });
});

// This section will help you create a new record.
router.post("/signup", async (req, res) => {
  try {
    let newDocument = {
      username: req.body.username,
      password: req.body.password,
    };
    let collection = await db.collection("users");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding record");
  }
});

// add an event to the users list of events 
router.post("/addEvent", async (req, res) => {
  try {
    let collection = await db.collection("users");
    let query = { username: req.body.username };
    let updates = {
      $push: {
        events: req.body.event,
      },
    };
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding event");
  }
});

// get events user has via params 
router.get("/getEvents", async (req, res) => {
  let collection = await db.collection("users");
  let query = { username: req.query.username };
  collection
    .find(query)
    .toArray()
    .then((data) => {
      if (data.length === 0) return res.send("Not found").status(404);
      else return res.send(data[0].events).status(200);
    });
});

// update a particular event with new data using the event id
router.put("/updateEvent", async (req, res) => {
  try {
    let collection = await db.collection("users");
    let query = { username: req.body.username, "events.id": req.body.id };
    let updates = {
      $set: {
        "events.$.data": req.body.data,
      },
    };
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating event");
  }
});

// delete a particular event using the event id
router.delete("/deleteEvent", async (req, res) => {
  try {
    let collection = await db.collection("users");
    let query = { username: req.body.username };
    let updates = {
      $pull: {
        events: { id: req.body.id },
      },
    };
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting event");
  }
});

export default router;