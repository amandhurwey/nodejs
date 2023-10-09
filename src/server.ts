import express from "express";
import fs from "fs";
import path from "path";
//1. get the app
const app = express();

app.use((req, res, next) => {
  console.log(`I will be called every time`);
  next();
});

app.use(`/users`, (req, res) => {
  console.log(`Inside users path`);
  fs.readFile(path.join(__dirname, "./data/users.txt"), "utf8", (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.end("Internal Server Error");
      return;
    }
    const users = data.trim().split("\n");
    const usersHtml = users.map((user) => `<li>${user}</li>`).join(``);
    res.setHeader("Content-type", "text/html");
    res.statusCode = 200;
    return res.send(`<h1>Users List</h1> <ul>${usersHtml}</ul>`);
  });
});

app.use(`/`, (req, res) => {
  console.log(`Inside Root path`);
  fs.createReadStream(path.join(__dirname, "./templates/basicForm.html")).pipe(res);
});

//listen
app.listen(3001);
