import express from "express";
import { makeRequest } from "../controllers/request.controller";

const router = express.Router();

router.post("/generate/:model", makeRequest);

export { router as RunpodRoutes };
