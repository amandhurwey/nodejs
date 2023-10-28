import { Router } from "express";
const notFoundRouter = Router();

notFoundRouter.use(`/`, (req, res) => {
  res.status(404).render(`404.ejs`, { pageTitle: `Page not found` });
});

export default notFoundRouter;
