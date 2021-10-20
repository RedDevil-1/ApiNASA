const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const PIC = require("./models/picModel");

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
app.set("views", __dirname);
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("dotenv").config();

const db = process.env.MONGO_URL;
mongoose
  .connect(db, { useUnifiedTopology: true })
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));

app.get("/", async (req, res) => {
  var date101 = new Date().toJSON().slice(0, 10);
  fetchAndRun(date101, req, res);
});

app.post("/newPic", async (req, res) => {
  console.log(req.body.date);
  fetchAndRun(req.body.date, req, res);
});

async function fetchAndRun(date101, req, res) {
  api_key = process.env.API_KEY;
  const response = await fetch(`${api_key}&date=${date101}`, { method: "GET" })
    .then((res) => res.json())
    .catch((err) => console.log(err));

  const explanation = response.explanation,
    title = response.title;
  let url = response.url;
  if (!url.includes(".jpg")) {
    let startingPoint = url.lastIndexOf("/") + 1;
    let endingPoint = url.lastIndexOf("?");
    url1 = `https://img.youtube.com/vi/${url.slice(
      startingPoint,
      endingPoint
    )}/mqdefault.jpg`;
    console.log(url1);
    url = url1;
  }
  console.log(response);
  PIC.findOne({ date: date101 }).then((pic) => {
    if (pic) {
      res.render("./index.ejs", {
        date: date101,
        explanation: explanation,
        title: title,
        url: url,
      });
    } else {
      try {
        const newPic = new PIC({
          date: date101,
          url,
          title,
          explanation,
        });
        newPic.save();
        console.log(newPic);
        console.log("creation successful");
        res.render("index.ejs", {
          date: date101,
          url: url,
          explanation: explanation,
          title: title,
        });
      } catch (err) {
        console.log("something went wrong", err);
      }
    }
  });
}

const PORT = process.env.PORT | 8080;
app.listen(PORT, console.log(`Port started on ${PORT}`));
