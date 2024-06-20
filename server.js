const express = require("express");
const db = require("./db");

const app = express();

app.get("/", (req, res) => {
  res.send("Hasmi Is topper & Programme!");
});

const personRoutes = require("./routes/personRouter");
app.use("/", personRoutes);
const menuRoutes = require("./routes/menuRoutes");
app.use("/", menuRoutes);

app.listen(3000);
