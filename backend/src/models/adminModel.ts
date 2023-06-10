import client from '../database';
import { Admin, Role } from '@prisma/client';

// Define type for creating new admin
type AdminCreateInput = {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  role?: Role;
};

// Define type for updating admin
type AdminUpdateInput = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  role?: Role;
};

// Define the class that represents the Admin model
export class AdminStore {
  // Get all admins
  async index(): Promise<Admin[]> {
    try {
      const admins = await client.admin.findMany();
      return admins;
    } catch (error) {
      throw new Error(`Could not get admins. Error: ${error}`);
    } finally {
      await client.$disconnect();
    }
  }

  // Get single admin
  async show(id: string): Promise<Admin | null> {
    try {
      const admin = await client.admin.findUnique({
        where: {
          id: id
        }
      });
      return admin;
    } catch (error) {
      throw new Error(`Could not find admin ${id}. Error: ${error}`);
    } finally {
      await client.$disconnect();
    }
  }

  // Create a new admin
  async create(adminData: AdminCreateInput): Promise<Admin> {
    try {
      const admin = await client.admin.create({
        data: adminData
      });
      return admin;
    } catch (error) {
      throw new Error(`Could not create admin. Error: ${error}`);
    } finally {
      await client.$disconnect();
    }
  }

  // Update an admin
  async update(id: string, adminData: AdminUpdateInput): Promise<Admin> {
    try {
      const admin = await client.admin.update({
        where: {
          id: id
        },
        data: adminData
      });
      return admin;
    } catch (error) {
      throw new Error(`Could not update admin ${id}. Error: ${error}`);
    } finally {
      await client.$disconnect();
    }
  }

  // Delete an admin
  async delete(id: string): Promise<Admin> {
    try {
      const admin = await client.admin.delete({
        where: {
          id: id
        }
      });
      return admin;
    } catch (error) {
      throw new Error(`Could not delete admin ${id}. Error: ${error}`);
    } finally {
      await client.$disconnect();
    }
  }

  // Get admin by email
  async showByEmail(email: string): Promise<Admin | null> {
    try {
      const admin = await client.admin.findUnique({
        where: {
          email: email
        }
      });
      return admin;
    } catch (error) {
      throw new Error(`Could not find admin. Error: ${error}`);
    } finally {
      await client.$disconnect();
    }
  }
}
