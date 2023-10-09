import express from "express";
import productRouter from "./routes/products";
import rootRouter from "./routes";
import notFoundRouter from "./routes/404";

//1. get the app
const app = express();

//2. Add middle wares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//3. Handle Routing
app.use(`/products`, productRouter);
app.use(`/`, rootRouter);
app.use(notFoundRouter);

//listen
app.listen(3001);
