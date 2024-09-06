require("dotenv").config();
const cors = require("cors");
global.fetch = require("node-fetch");
global.Headers = require("node-fetch").Headers;

const express = require("express");
const app = express();

const router = require("./routes/index");

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

module.exports = app;
