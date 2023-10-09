import { Router } from "express";
const notFoundRouter = Router();

notFoundRouter.use(`/`, (req, res) => {
  res.status(404).end(`<h1>Page not found</h1>`);
});

export default notFoundRouter;
