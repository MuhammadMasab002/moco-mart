import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  singleProduct,
  updateProduct,
} from "../controllers/productController.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";

const productRouter = Router();

// Define product routes here
productRouter.get("/", verifyJWT, verifyAdmin, getAllProducts);
productRouter.get("/:id", singleProduct);

productRouter.post("/", verifyJWT, verifyAdmin, createProduct);
productRouter.put("/:id", verifyJWT, verifyAdmin, updateProduct);
productRouter.delete("/:id", verifyJWT, verifyAdmin, deleteProduct);

export default productRouter;
