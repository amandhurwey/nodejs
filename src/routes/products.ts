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
    try {
      const products = JSON.parse(data);
      return res.render("products", { products, pageTitle: "Products" });
    } catch (error) {
      console.log(`Error in reading products`, error);
      return res.status(500).send(`Internal Server Error`);
    }
  });
});

productRouter.get(`/add-product`, (req, res) => {
  res.status(200).render("add-product", { pageTitle: "Add Product" });
});

productRouter.post(`/add-product`, (req, res) => {
  const body = req.body;
  const productName = body?.[`product-name`];
  const productDescription = body?.[`prodcut-description`];
  const productUrl = body?.[`image-url`];
  const product = {
    productName,
    productDescription,
    productUrl,
  };
  fs.readFile(path.join(rootPath, "data", "products.txt"), "utf-8", (err, data) => {
    if (err) {
      //file dose not exist -> write a new file
      fs.writeFile("products.txt", JSON.stringify([product]), (err) => {
        if (err) {
          console.log("Error writing new product to new file", err);
          return res.status(500).send("Internal Server Error");
        }
      });
    } else {
      try {
        const products = JSON.parse(!data ? "[]" : data);
        products.push(product);
        fs.writeFile(path.join(rootPath, "data", "products.txt"), JSON.stringify(products), (err) => {
          if (err) {
            throw new Error("Could not write to the file");
          } else {
            res.redirect("/products");
          }
        });
      } catch (error) {
        console.log("Error in writing product to file", error);
        return res.status(500).send("Internal Server Error");
      }
    }
  });
});

export default productRouter;
