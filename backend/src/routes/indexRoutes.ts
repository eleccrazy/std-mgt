import { Router, Request, Response } from 'express';
import programRouter from './programRoutes';
import hubRouter from './hubRoutes';
import adminRouter from './adminRoutes';
import cohortRouter from './cohortRoutes';

const indexRouter = Router();

indexRouter.use('/programs', programRouter);
indexRouter.use('/hubs', hubRouter);
indexRouter.use('/admins', adminRouter);
indexRouter.use('/cohorts', cohortRouter);

indexRouter.get('/', (req: Request, res: Response) => {
  res.send('Hello from index routes!');
});

export default indexRouter;
