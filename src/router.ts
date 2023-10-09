import http from "http";
import fs from "fs";
import path from "path";
import { parse } from "querystring";

const handleRouter: http.RequestListener<typeof http.IncomingMessage, typeof http.ServerResponse> = (req, res) => {
  const url = req.url;
  const method = req.method;
  console.log(url, method);
  if (url === `/` && method === `GET`) {
    //set the content type
    res.setHeader(`Content-type`, `text/html`);
    //read the file

    // fs.readFile can be used for small files where we want to read the whole content and then return the data or perform some actions
    // fs.readFile(path.join(__dirname, "./templates/basicForm.html"), (err, data) => {
    //   if (err) {
    //     res.statusCode = 500;
    //     res.end(`Internal Server Error`);
    //     return;
    //   }

    //   res.statusCode = 200;
    //   res.end(data);
    // });

    //fs.createReadStream can be used for read large files chuck by chucnk
    return fs.createReadStream(path.join(__dirname, "./templates/basicForm.html")).pipe(res);
  } else if (url === `/create-user` && method === `POST`) {
    let body = "";
    req.on(`data`, (chunk) => (body += chunk.toString()));
    req.on(`end`, () => {
      //parse form data;
      const formData = parse(body);
      //get user name
      const name = formData.userName;
      fs.appendFile(path.join(__dirname, "./data/users.txt"), name + "\n", (err) => {
        if (err) {
          res.statusCode = 500;
          res.end("Internal Server Error");
          return;
        }

        // Redirect back to the form page
        res.statusCode = 302;
        res.setHeader("Location", "/");
        res.end();
      });
    });
  } else if (url === `/users` && method === "GET") {
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
      return res.end(`<h1>Users List</h1> <ul>${usersHtml}</ul>`);
    });
  }
};
export default handleRouter;
