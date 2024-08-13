import express from "express";
import { isAuthenticatedUser, authorizeRoles } from "../middleware/auth.js";
import { getSingleOrder, newOrder } from "../controllers/orderController.js";
const router = express.Router();

router.route("/order1/new").post(isAuthenticatedUser, newOrder);
router
  .route("/order1/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleOrder);

export default router;
