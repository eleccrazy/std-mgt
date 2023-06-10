import { Router, Request, Response } from 'express';
import { verifyAuthToken } from '../middlewares/authenticate';
import { hubController } from '../controllers/hubControllers';

// Create a new router
const hubRouter = Router();

hubRouter.get('/', hubController.listHubs);
hubRouter.post('/', hubController.createHub);
hubRouter.get('/:id', hubController.getHub);
hubRouter.put('/:id', hubController.updateHub);
hubRouter.delete('/:id', hubController.deleteHub);

export default hubRouter;
