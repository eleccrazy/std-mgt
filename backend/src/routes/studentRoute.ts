import { Router, Request, Response } from 'express';
import { studentController } from '../controllers/studentControllers';

const studentRouter = Router();

// Define the /students route
studentRouter.get('/', studentController.listStudents);
studentRouter.get('/:id', studentController.getStudent);
//studentRouter.post('/', studentController.createStudent);
studentRouter.post('/', (req, res) => {
  console.log(req.body);
  res.json({ message: 'Success' });
});
studentRouter.get('/:id/qr-image', studentController.getStudentQRCode);
studentRouter.delete('/:id', studentController.deleteStudent);

export default studentRouter;
