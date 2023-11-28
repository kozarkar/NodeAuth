import express from 'express';
import userController from '../controllers/user.controller.js';

const router = express.Router();


// Public routes
router.post('/register', userController.userRegistration);

// Protected routes


export default router;