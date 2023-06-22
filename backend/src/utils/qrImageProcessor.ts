import fs, { promises as fsPromises } from 'fs';
import QRCode from 'qrcode';
import path from 'path';
import { QRCodeStore } from '../models/qrCodeModel';

const basePath = path.join(__dirname, '../../public/qrcodes');

// Create a new instance for the QRCodeStore class
const qrCodeStore = new QRCodeStore();

// Create a new function to generate QR codes
export const generateQRCode = async (studentId: string) => {
  try {
    // Check if the student already has a QR code
    const qrCode = await qrCodeStore.show(studentId);
    // If the student already has a QR code
    if (qrCode) {
      // Return the QR code
      return { error: 'QR code for the student exists' };
    }
    const completePath = `${basePath}/${studentId}.png`;
    const qrCodeImage = await QRCode.toBuffer(studentId, { scale: 5 });
    await fsPromises.writeFile(completePath, qrCodeImage);
    return { path: completePath };
  } catch (error) {
    throw new Error(`Could not create a path. Error: ${error}`);
  }
};

// Get QR image path from file system
export const getImagePath = (studentId: string) => {
  try {
    const completePath = `${basePath}/${studentId}.png`;
    // Check if path exists
    if (!fs.existsSync(completePath)) {
      return { error: 'QR image not path found' };
    }
    return completePath;
  } catch (error) {
    throw new Error(`Could not get QR image path. Error: ${error}`);
  }
};

// Delete QR image from file system
export const deleteQRImage = async (studentId: string) => {
  const completePath = `${basePath}/${studentId}.png`;
  try {
    // Check if the path exists
    await fsPromises.access(completePath);
    await fsPromises.unlink(completePath);
    return { message: 'QR image deleted' };
  } catch (error) {
    throw new Error(`Could not delete QR image. Error: ${error}`);
  }
};
