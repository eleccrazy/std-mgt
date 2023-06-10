import { Router, Request, Response } from 'express';
import { verifyAuthToken } from '../middlewares/authenticate';
import { programController } from '../controllers/programControllers';

// Create a new router
const programRouter = Router();

// Define the /programs route
programRouter.get('/', programController.listPrograms);
programRouter.post('/', programController.createProgram);
programRouter.get('/:id', programController.getProgram);
programRouter.put('/:id', programController.updateProgram);
programRouter.delete('/:id', programController.deleteProgram);

export default programRouter;
