// Required modules
import express from 'express';
 
const router = express.Router();

router.post('/customer/products');
router.post('/customer/product');
router.post('/customer/login');


// Export
export { router as customerRouter };