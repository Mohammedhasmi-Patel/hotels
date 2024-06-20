const express = require("express");
const router = express.Router();
const Person = require("../Models/Person");

router.post("/person", async (req, res) => {
  try {
    const data = req.body;
    const result = await Person.insertOne(data);
    res.json({ success: "Data inserted successfully!", data: result }); // Send success message and inserted data
  } catch (err) {
    console.error(err);
    res.status(500).send("Error inserting data");
  }
});

router.get("/person/:workType", async (req, res) => {
  const workType = req.params.workType;
  try {
    const response = await Person.find({ work: workType });
    console.log("response fecthed");
    if (response) {
      res.status(200).json(response);
    } else {
      res.status(400).json({ err: "Invalid work type" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "invaid server error" });
  }
});

router.get("/person", async (req, res) => {
  try {
    const response = await Person.find();
    if (!response) {
      console.log("Not found.....");
      return res.status(404).send("Not found data.....");
    } else {
      console.log("Data not found.....");
      res.status(200).json(response);
    }
  } catch (err) {
    res.send(500).json({ err: "Internal Server Error" });
  }
});

router.put("/person/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updateData = req.body;

    const response = await Person.findByIdAndUpdate(personId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!response) {
      console.log("error");
      return res.status(404).send("not found....");
    } else {
      console.log("Updated successfullly.....");
      res.status(200).json(response);
    }
  } catch (err) {
    console.log("Error ocurred");
    res.json({ err: "Internal Server Error" });
  }
});

// lets delete person data

router.delete("/person/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId);

    if (!response) {
      console.log("Data not found....");
      return res.status(404).send("data not found....");
    } else {
      console.log("Data deleted succesfully.....");
      res.status(200).json(response);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal Server Error" });
  }
});

module.exports = router;
