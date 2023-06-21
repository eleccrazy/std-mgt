import { StudentStore } from '../models/studentModel';
import { ProgramStore } from '../models/programModel';
import { HubStore } from '../models/hubModel';
import { QRCodeStore } from '../models/qrCodeModel';
import { CohortStore } from '../models/cohortModel';
import {
  generateQRCode,
  getImagePath,
  deleteQRImage
} from '../utils/qrImageProcessor';

import { Request, Response } from 'express';
import path from 'path';

// Create a new instances of Store classes
const studentStore = new StudentStore();
const programStore = new ProgramStore();
const hubStore = new HubStore();
const qrCodeStore = new QRCodeStore();
const cohortStore = new CohortStore();

// Define expected arguments for the createStudent method
const expectedArgs = [
  'firstName',
  'lastName',
  'programId',
  'hubId',
  'cohortId',
  'area',
  'city',
  'isAlumni',
  'gender',
  'phone',
  'email'
];

// Define valid genders
const validGenders = ['Male', 'Female', 'Other'];

// Define the student controller
export const studentController = {
  // Define the listStudents method
  async listStudents(req: Request, res: Response) {
    try {
      // Get all the students
      const students = await studentStore.index();
      // Return the students
      return res.json(students);
    } catch (error) {
      // Return an error message
      return res.status(500).json(error);
    }
  },

  // Define the getStudent method
  async getStudent(req: Request, res: Response) {
    try {
      // Get the student id from the request params
      const { id } = req.params;
      // Get the student
      const student = await studentStore.show(id);
      // If the student does not exist
      if (!student) {
        // Return an error message
        return res.status(404).json({ error: 'Student not found' });
      }
      // Return the student
      return res.json(student);
    } catch (error) {
      // Return an error message
      return res.status(500).json(error);
    }
  },

  // Define the createStudent method
  async createStudent(req: Request, res: Response) {
    try {
      // Get the student details from the request body
      const studentDetails = req.body;
      // Check if all expected arguments are present
      const allArgsPresent = expectedArgs.every((arg) =>
        Object.keys(studentDetails).includes(arg)
      );
      // If all expected arguments are not present
      if (!allArgsPresent) {
        // Return an error message
        return res
          .status(400)
          .json({ error: `${expectedArgs.join(', ')} are required` });
      }
      // Check if the argument sent from the client is not included in expected arguments
      const extraArgs = Object.keys(studentDetails).filter(
        (arg) => !expectedArgs.includes(arg)
      );
      // If extra arguments are present
      if (extraArgs.length > 0) {
        // Return an error message
        return res
          .status(400)
          .json({ error: `${extraArgs.join(', ')} are not required` });
      }
      // Check if the gender is a valid gender
      if (!validGenders.includes(studentDetails.gender)) {
        return res.status(400).json({
          erorr:
            'Students gender must be one of the following: Male, Female, Other'
        });
      }
      // Check if isAlumni is a boolean
      if (typeof studentDetails.isAlumni !== 'boolean') {
        return res.status(400).json({ error: 'isAlumni must be a boolean' });
      }

      // Check if other properties except isAlumni are strings
      const nonStringProperties = Object.keys(studentDetails).filter(
        (arg) => arg !== 'isAlumni'
      );
      const nonStringPropertiesWithInvalidType = nonStringProperties.filter(
        (arg) => typeof studentDetails[arg] !== 'string'
      );
      if (nonStringPropertiesWithInvalidType.length > 0) {
        return res.status(400).json({
          error: `${nonStringPropertiesWithInvalidType.join(
            ', '
          )} must be a string`
        });
      }
      // Check if the program with the programId exists
      const program = await programStore.show(studentDetails.programId);
      // If the program does not exist
      if (!program) {
        // Return an error message
        return res.status(404).json({ error: 'Program not found' });
      }
      // Check if the cohort with  cohortId exists
      const cohort = await cohortStore.show(studentDetails.cohortId);
      if (!cohort) {
        // Return an error message
        return res.status(404).json({ error: 'Cohort not found' });
      }
      // Check if the cohort exists in the program
      if (cohort.programId !== program.id) {
        return res
          .status(400)
          .json({ error: 'Cohort does not exist in the program' });
      }

      // Check if the hub with the hubId exists
      const hub = await hubStore.show(studentDetails.hubId);
      // If the hub does not exist
      if (!hub) {
        // Return an error message
        return res.status(404).json({ error: 'Hub not found' });
      }
      // Check if the student with the email exists
      const students = await studentStore.index();
      const existingStudent = students.find(
        (student) => student.email === studentDetails.email
      );
      // If the student with the email exists
      if (existingStudent) {
        // Return an error message
        return res.status(400).json({ error: 'Email exists' });
      }
      // Check if the student with the phone exists
      const existingStudentWithPhone = students.find(
        (student) => student.phone === studentDetails.phone
      );
      // If the student with the phone exists
      if (existingStudentWithPhone) {
        return res.status(400).json({ error: 'Phone number exists' });
      }

      // Create a new Student
      const student = await studentStore.create(studentDetails);
      const studentId = student.id;
      // Get path to QR code.
      const completePath = await generateQRCode(studentId);
      // Check if completePath is a string
      if (typeof completePath === 'string') {
        // Delete the student object
        await studentStore.delete(studentId);
        return res.status(400).json({ completePath });
      }
      // Return an error message
      if (completePath.error) {
        return res.status(500).json({ error: 'QR code generation failed' });
      }
      // Generate a new QR code
      const newQRCode = await qrCodeStore.create({
        code: studentId,
        path: completePath.path as string,
        studentId: studentId
      });
      return res.json(student);
    } catch (error) {
      // Return an error message
      return res.status(500).json(`Error: ${error}`);
    }
  },

  // Get a student's QR code
  async getStudentQRCode(req: Request, res: Response) {
    try {
      // Get the student id from the request params
      const { id } = req.params;
      // Get the student
      const student = await studentStore.show(id);
      // If the student does not exist
      if (!student) {
        // Return an error message
        return res.status(404).json({ error: 'Student not found' });
      }
      // Get the student's QR code
      const qrCode = await qrCodeStore.show(id);
      // If the QR code does not exist
      if (!qrCode) {
        // Return an error message
        return res.status(404).json({ error: 'QR code not found' });
      }
      // Get the QR code image path
      const imagePath = getImagePath(id);
      // If the image path does not exist
      if (typeof imagePath !== 'string') {
        // Return an error message
        return res.status(404).json({ error: 'QR code image not found' });
      }
      // Return the QR code image
      res.sendFile(path.resolve(imagePath));
    } catch (error) {
      // Return an error message
      return res.status(500).json(error);
    }
  },

  // Delete a student
  async deleteStudent(req: Request, res: Response) {
    try {
      // Get the student id from the request params
      const { id } = req.params;
      // Get the student
      const student = await studentStore.show(id);
      // If the student does not exist
      if (!student) {
        // Return an error message
        return res.status(404).json({ error: 'Student not found' });
      }
      // Delete the student's QR code
      await qrCodeStore.delete(id);
      // Delete the student's QR code image
      await deleteQRImage(id);
      // Delete the student
      await studentStore.delete(id);
      // Return a success message
      return res.json({ message: 'Student deleted' });
    } catch (error) {
      console.log(error);
      // Return an error message
      return res.status(500).json(`Could not delete student. Error: ${error}`);
    }
  }
};
