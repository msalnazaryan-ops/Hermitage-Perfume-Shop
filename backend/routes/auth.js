import express from 'express';
const router = express.Router();
import * as authController from '../controllers/authController.js'; // Անպայման .js-ով

router.post('/signup', authController.signup);
router.post('/login', authController.login);

export default router;