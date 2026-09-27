import express from 'express';
const postsRouter = express.Router();
import { index, show, create, update, modify, destroy } from '../controllers/postsController.js';

//index
postsRouter.get("/", index);

//show
postsRouter.get("/:id", show);

//create
postsRouter.post("/", create);

//update
postsRouter.put("/:id", update);

//modify
postsRouter.patch("/:id", modify);

//destroy
postsRouter.delete("/:id", destroy)

export default postsRouter;