import express from 'express';
const router = express.Router()
import {
    getProducts,
    getProductsById,
    createProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
    getTopProducts,
} from '../controllers/product.controller.js'

import { protect, admin } from '../middleware/auth.middleware.js';


router.route('/').get(getProducts).post(protect, admin, createProduct);

router.route('/:id/reviews').post(protect, createProductReview);

router.get('/top', getTopProducts);

router.route("/:id")
    .get(getProductsById)
    .put(protect, admin, updateProduct)
    .delete(protect, admin, deleteProduct)


export default router;