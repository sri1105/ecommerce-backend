// Required modules
import express from "express";

const router = express.Router();

router.post('/getProducts');
router.post('/addProduct');
router.post('/editProduct');
router.post('/deleteProducts');
router.post('/getProduct');

// Export
export { router as businessRouter };