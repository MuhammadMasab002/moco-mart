import { Router } from "express";
import {
  createSubCategory,
  deleteSubCategory,
  getAllSubCategories,
  updateSubCategory,
} from "../controllers/subCategoryController.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";

const subCategoryRouter = Router();

subCategoryRouter.get("/", getAllSubCategories);

subCategoryRouter.post("/", verifyJWT, verifyAdmin, createSubCategory);
subCategoryRouter.put("/:id", verifyJWT, verifyAdmin, updateSubCategory);
subCategoryRouter.delete("/:id", verifyJWT, verifyAdmin, deleteSubCategory);

export default subCategoryRouter;
