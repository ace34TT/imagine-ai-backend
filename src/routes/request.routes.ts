import express from "express";
import { makeRequestHandler } from "../controllers/request.controller";

const router = express.Router();

router.post("/generate", makeRequestHandler);
export { router as RunpodRoutes };
