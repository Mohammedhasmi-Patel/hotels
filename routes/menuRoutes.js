const express = require("express");
const router = express.Router();

const MenuItem = require("../Models/MenuItem");

router.get("/menuitems", async (req, res) => {
  const data = await MenuItem.find();
  if (!data) {
    res.status(500).send("error");
  } else {
    res.status(200).json(data);
  }
});

router.get("/menu/:money", async (req, res) => {
  const money = req.params.money;
  try {
    const response = await MenuItem.find({ price: money });
    if (!response) {
      console.log(`Not found your query`);
      res.status(404).send("Not Found!!!");
    } else {
      res.status(200).json(response);
    }
  } catch (err) {
    console.log(`${err} generate some error`);
  }
});

router.patch("/menuitems/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updatedData = req.body;
    const response = await MenuItem.findByIdAndUpdate(personId, updatedData, {
      new: true,
      runValidators: true,
    });

    // there is no data match
    if (!response) {
      console.log("Not found data...");
      return res.status(404).send("Not found");
    } else {
      console.log("Updated succesfully....");
      console.log(response);
      res.status(200).json(response);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal Server error" });
  }
});

// comment added for just testing
module.exports = router;
