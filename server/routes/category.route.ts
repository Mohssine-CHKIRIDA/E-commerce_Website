import express from "express";
import * as controller from "../controllers/category.controller";

const router = express.Router();

// === CATEGORY ROUTES ===
router.get("/categories", controller.getAllCategories);
router.get("/categories/:id", controller.getCategoryById);
router.post("/categories", controller.createCategory);
router.put("/categories/:id", controller.updateCategory);
router.delete("/categories/:id", controller.deleteCategory);

// === SUBCATEGORY ROUTES ===
router.get("/subcategories", controller.getAllSubcategories);


// === BRAND ROUTES ===
router.get("/brands", controller.getAllBrands);


export default router;
