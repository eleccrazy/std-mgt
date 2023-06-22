import client from '../database';
import { Attendance } from '@prisma/client';

// Define the custome type for creating a new Attendance
export type CreateAttendance = {
  studentId: string;
  hubId: string;
};

// Define the class that represent the Attendance model
export class AttendanceStore {
  // Define the show method
  async show(id: string): Promise<Attendance | null> {
    try {
      // Get the attendance
      const attendance = await client.attendance.findUnique({
        where: { id: id }
      });
      // Return the attendance
      return attendance;
    } catch (error) {
      // Return an error
      throw new Error(`Could not find attendance ${id}. Error: ${error}`);
    }
  }

  // Define the getAttendanceByStudentId method
  async getAttendanceByStudentId(studentId: string): Promise<Attendance[]> {
    try {
      // Get the attendance
      const attendance = await client.attendance.findMany({
        where: { studentId: studentId }
      });
      // Return the attendance
      return attendance;
    } catch (error) {
      // Return an error
      throw new Error(
        `Could not find attendance ${studentId}. Error: ${error}`
      );
    }
  }

  // Define a method for creating a new attendance
  async create(attendance: CreateAttendance): Promise<Attendance> {
    try {
      // Create a new attendance
      const newAttendance = await client.attendance.create({
        data: { ...attendance, checkInTime: new Date() }
      });
      // Return the new attendance
      return newAttendance;
    } catch (error) {
      // Return an error
      throw new Error(`Could not create new attendance. Error: ${error}`);
    }
  }

  // Define a method for setting a student's check out time
  async setCheckOutTime(id: string): Promise<Attendance> {
    try {
      const updatedAttendance = await client.attendance.update({
        where: { id: id },
        data: { checkOutTime: new Date() }
      });
      // Return the updated attendance
      return updatedAttendance;
    } catch (error) {
      // Return an error
      throw new Error(`Could not update attendance ${id}. Error: ${error}`);
    }
  }
}
