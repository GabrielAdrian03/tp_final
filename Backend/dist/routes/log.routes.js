"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const log_controller_1 = require("../controller/log.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.get("/", auth_middleware_1.authenticateJWT, log_controller_1.getLogs);
exports.default = router;
