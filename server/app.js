require("dotenv").config();
const cors = require("cors");
global.fetch = require("node-fetch");
global.Headers = require("node-fetch").Headers;

const express = require("express");
const app = express();
const port = 3000;
const router = require("./routes/index");

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
