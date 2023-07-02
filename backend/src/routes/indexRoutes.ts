import express, { Router, Request, Response } from 'express';
import programRouter from './programRoutes';
import hubRouter from './hubRoutes';
import adminRouter from './adminRoutes';
import cohortRouter from './cohortRoutes';
import studentRouter from './studentRoute';

const indexRouter = Router();
// Serve images from the "public" directory
indexRouter.use('/images', express.static('public'));

indexRouter.use('/programs', programRouter);
indexRouter.use('/hubs', hubRouter);
indexRouter.use('/admins', adminRouter);
indexRouter.use('/cohorts', cohortRouter);
indexRouter.use('/students', studentRouter);
indexRouter.use('/guests', studentRouter);

indexRouter.get('/', (req: Request, res: Response) => {
  res.send('Hello from index routes!');
});

export default indexRouter;
