import express from "express";
import productRouter from "./routes/products";
import rootRouter from "./routes";
import notFoundRouter from "./routes/404";
import path from "path";
import rootPath from "./utils/path";

//1. get the app
const app = express();

app.set("view engine", "ejs");
app.set("views", "src/views");

//2. Add middle wares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(rootPath, "../public")));

//3. Handle Routing
app.use(`/products`, productRouter);
app.use(`/`, rootRouter);
app.use(notFoundRouter);

//listen
app.listen(3001);
