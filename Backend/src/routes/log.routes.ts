
import { Router } from "express";
import { getLogs } from "../controller/log.controller";
import { authenticateJWT } from "../middleware/auth.middleware";

const router = Router();

router.get("/", authenticateJWT, getLogs);

export default router;
