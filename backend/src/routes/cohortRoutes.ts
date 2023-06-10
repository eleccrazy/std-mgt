import { cohortController } from '../controllers/cohortControllers';
import { Router } from 'express';

// Create a new router
const cohortRouter = Router();

cohortRouter.get('/', cohortController.listCohorts);
cohortRouter.post('/', cohortController.createCohort);
cohortRouter.get('/:id', cohortController.getCohort);
cohortRouter.put('/:id', cohortController.updateCohort);
cohortRouter.delete('/:id', cohortController.deleteCohort);

export default cohortRouter;
