import express from "express";
import { getCustomersController } from "../controllers/customer.controller";

const router = express.Router();

router.get("/", getCustomersController);

export default router;
