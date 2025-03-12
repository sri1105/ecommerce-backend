// Required modules
import express from "express";
import { processesRequest } from "../controllers/controller";

const router = express.Router();

router.post('/getProducts', processesRequest);
router.post('/addProduct', processesRequest);
router.post('/editProduct', processesRequest);
router.post('/deleteProducts', processesRequest);
router.post('/getProduct', processesRequest);

// Export
export { router as businessRouter };