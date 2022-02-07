const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { collection } = require("./model/user.model");
const userSchema = require("./model/user.model");
const cors = require("cors");

app.use(cors());
app.use(express.urlencoded());
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://dork7:vUe9WHLa0TiQCcjJ@mcluster.7kxtv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useCreateIndex: true,
      keepAlive: 1,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  )
  .then(() => {
    console.log(`connected to db`);
  })
  .catch(
    (err) => {
      console.log(`error in connecting`, err);
    },
    { collection: "user=data" }
  );

app.get("/", (req, res, next) => {
  userSchema.find().then((doc) => {
    res.send(doc);
  });
});

app.post("/", async (req, res, next) => {
  //   const data = {
  //     title: req.body.title,
  //     content: req.body.content,
  //     author: req.body.author,
  //   };
  console.log(req.body);
  const user = await new userSchema(req.body).save();
  return res.json({ user });
});

app.put("/", (req, res) => {
  let newUser = new userSchema(req);
  res.json("update not mature enough");
});

app.listen(3000);
