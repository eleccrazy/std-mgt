import { QRCode } from '@prisma/client';
import client from '../database';

// Create a custome type for creating a new QR code.
export type CreateQRCodeType = {
  code: string;
  path: string;
  studentId: string;
};

// Define the class that represents the QR code model
export class QRCodeStore {
  // Get all QR codes
  async index(): Promise<QRCode[]> {
    try {
      const qrCodes = await client.qRCode.findMany();
      return qrCodes;
    } catch (error) {
      throw new Error(`Could not get QR codes. Error: ${error}`);
    } finally {
      await client.$disconnect();
    }
  }

  // Get a single QR code by studentId
  async show(studentId: string): Promise<QRCode | null> {
    try {
      const qrCode = await client.qRCode.findUnique({
        where: {
          studentId: studentId
        }
      });
      return qrCode;
    } catch (error) {
      throw new Error(`Could not find QR code ${studentId}. Error: ${error}`);
    } finally {
      await client.$disconnect();
    }
  }

  // Create a new QR code
  async create(qrCode: CreateQRCodeType): Promise<QRCode> {
    try {
      const newQRCode = await client.qRCode.create({
        data: {
          ...qrCode
        }
      });
      return newQRCode;
    } catch (error) {
      throw new Error(`Could not create QR code. Error: ${error}`);
    } finally {
      await client.$disconnect();
    }
  }

  // Delete a QR code
  async delete(studentId: string): Promise<QRCode> {
    try {
      const deletedQRCode = await client.qRCode.delete({
        where: {
          studentId: studentId
        }
      });
      return deletedQRCode;
    } catch (error) {
      throw new Error(`Could not delete QR code. Error: ${error}`);
    } finally {
      await client.$disconnect();
    }
  }
}
