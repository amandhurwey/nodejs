import { Router } from "express";
import rootPath from "../utils/path";
import path from "path";

const rootRouter = Router();

rootRouter.get(`/`, (req, res) => {
  res.sendFile(path.join(rootPath, "views", "index.html"));
});

export default rootRouter;
