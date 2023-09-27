import express from "express";
import {
  makeSdxlRequestHandler,
  makeWuerstchenV2RequestHandler,
} from "../controllers/request.controller";

const router = express.Router();

router.post("/generate/sdxl", makeSdxlRequestHandler);
router.post("/generate/wuerstchen_v2", makeSdxlRequestHandler);
export { router as RunpodRoutes };
