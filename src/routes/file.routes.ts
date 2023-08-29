import express from "express";
import { downloadImageHandler } from "../controllers/file.controller";
const router = express.Router();

router.post("/download", downloadImageHandler);

export { router as FileRoutes };
