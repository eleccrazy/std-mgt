import client from '../database';
import { Student, Gender } from '@prisma/client';

// Create a custome type for creating a student.
export type CreateStudentType = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: Gender;
  isAlumuni: boolean;
  city: string;
  area: string;
  programId: string;
  hubId: string;
  cohortId: string;
};

// Create a custome type for updating a student
export type UpdateStudentType = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  gender?: Gender;
  isAlumuni?: boolean;
  city?: string;
  area?: string;
  programId?: string;
  hubId?: string;
  cohortId?: string;
};

// Define the class that represents the Student model
export class StudentStore {
  // Get all students
  async index(): Promise<Student[]> {
    try {
      const students = await client.student.findMany();
      return students;
    } catch (error) {
      throw new Error(`Could not get students. Error: ${error}`);
    } finally {
      await client.$disconnect();
    }
  }

  // Get a single student by id
  async show(id: string): Promise<Student | null> {
    try {
      const student = await client.student.findUnique({
        where: {
          id: id
        }
      });
      return student;
    } catch (error) {
      throw new Error(`Could not find student ${id}. Error: ${error}`);
    } finally {
      await client.$disconnect();
    }
  }

  // Create a new student
  async create(student: CreateStudentType): Promise<Student> {
    try {
      const newStudent = await client.student.create({
        data: {
          ...student
        }
      });
      return newStudent;
    } catch (error) {
      throw new Error(`Could not create student. Error: ${error}`);
    } finally {
      await client.$disconnect();
    }
  }

  // Update a student
  async update(id: string, student: UpdateStudentType): Promise<Student> {
    try {
      const updatedStudent = await client.student.update({
        where: {
          id: id
        },
        data: {
          ...student
        }
      });
      return updatedStudent;
    } catch (error) {
      throw new Error(`Could not update student ${id}. Error: ${error}`);
    } finally {
      await client.$disconnect();
    }
  }

  // Delete a student by its id
  async delete(id: string): Promise<Student> {
    try {
      const deletedStudent = await client.student.delete({
        where: {
          id: id
        }
      });
      return deletedStudent;
    } catch (error) {
      throw new Error(`Could not delete student ${id}. Error: ${error}`);
    } finally {
      await client.$disconnect();
    }
  }

  // Get all attendances of a student
  async getAttendances(id: string): Promise<any> {
    try {
      const attendances = await client.attendance.findMany({
        where: {
          studentId: id
        }
      });
      return attendances;
    } catch (error) {
      throw new Error(
        `Could not get attendances of student ${id}. Error: ${error}`
      );
    } finally {
      await client.$disconnect();
    }
  }
}
