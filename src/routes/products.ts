import { Router } from "express";
import path from "path";
import rootPath from "../utils/path";
import fs from "fs";

const productRouter = Router();

productRouter.get(`/`, (req, res) => {
  fs.readFile(path.join(rootPath, "data", "products.txt"), "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Internal Server Error");
      return;
    }
    const products = data.trim().split("\n");
    const productsHtml = products.map((product) => `<li>${product}</li>`).join(``);

    return res.status(200).send(`<h1>Product List</h1> <ul>${productsHtml}</ul>`);
  });
});

productRouter.get(`/add-product`, (req, res) => {
  res.status(200).sendFile(path.join(rootPath, "views", "add-product.html"));
});

productRouter.post(`/add-product`, (req, res) => {
  const body = req.body;
  const productName = body?.[`product-name`];
  fs.appendFile(path.join(rootPath, "data", "products.txt"), productName + "\n", (err) => {
    if (err) {
      res.status(500).send(`Internal Server Error`);
      return;
    }
    res.redirect("/products");
  });
});

export default productRouter;
