import { Router, Request, Response } from 'express';
import { verifyAuthToken } from '../middlewares/authenticate';
import { adminController } from '../controllers/adminControllers';

// Create a new rotuer
const adminRouter = Router();

adminRouter.get('/', adminController.getAdmins);
adminRouter.post('/', adminController.createAdmin);
adminRouter.get('/:id', adminController.getAdmin);
adminRouter.put('/id', adminController.updateAdmin);
adminRouter.post('/login', adminController.logInAdmin);

export default adminRouter;
