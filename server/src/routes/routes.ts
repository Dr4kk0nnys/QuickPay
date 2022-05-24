import { Router } from "express";
const router = Router();

/* Note: Routes */
import { paymentRouter } from "./payment/pay";

/* Note: Using routes */
router.use('/payment', paymentRouter);

export { router as routes };