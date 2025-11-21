import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from "../controllers/categoryController.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";

const categoryRouter = Router();

categoryRouter.get("/", getAllCategories);

categoryRouter.post("/", verifyJWT, verifyAdmin, createCategory);
categoryRouter.put("/:id", verifyJWT, verifyAdmin, updateCategory);
categoryRouter.delete("/:id", verifyJWT, verifyAdmin, deleteCategory);

export default categoryRouter;
