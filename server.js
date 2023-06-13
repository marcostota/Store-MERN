require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const nunjucks = require("nunjucks");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const session = require('./src/config/session')
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());

app.use(express.static("public"));

mongoose.connect(process.env.MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to the database'))
.catch(error => console.error('Database connection error:', error));

app.use(session);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

nunjucks.configure(path.resolve(__dirname, "src/views"), {
  watch: true,
  express: app,
  autoescape: true,
});

app.set("view engine", "njk");
app.use(require("./src/routes"));

app.listen(process.env.PORT || 3002);


