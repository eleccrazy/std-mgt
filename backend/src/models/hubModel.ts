import client from '../database';
import { Hub } from '@prisma/client';
import { Student } from '@prisma/client';

// Define the class that represents the hub model
export class HubStore {
  // Get all hubs
  async index(): Promise<Hub[]> {
    try {
      const hubs = await client.hub.findMany();
      return hubs;
    } catch (error) {
      throw new Error(`Could not get hubs. Error: ${error}`);
    } finally {
      await client.$disconnect();
    }
  }

  // Get single hub by id
  async show(id: string): Promise<Hub | null> {
    try {
      const hub = await client.hub.findUnique({
        where: {
          id: id
        }
      });
      return hub;
    } catch (error) {
      throw new Error(`Could not find hub ${id}. Error: ${error}`);
    } finally {
      await client.$disconnect();
    }
  }

  // Get single hub by name
  async showByName(name: string): Promise<Hub | null> {
    try {
      const hub = await client.hub.findUnique({
        where: {
          name: name
        }
      });
      return hub;
    } catch (error) {
      throw new Error(`Could not find hub ${name}. Error: ${error}`);
    } finally {
      await client.$disconnect();
    }
  }

  // Create a new hub
  async create(name: string): Promise<Hub> {
    try {
      const hub = await client.hub.create({
        data: {
          name
        }
      });
      return hub;
    } catch (error) {
      throw new Error(`Could not create hub. Error: ${error}`);
    } finally {
      await client.$disconnect();
    }
  }

  // Update a hub
  async update(id: string, name: string): Promise<Hub> {
    try {
      const hub = await client.hub.update({
        where: {
          id: id
        },
        data: {
          name
        }
      });
      return hub;
    } catch (error) {
      throw new Error(`Could not update hub. Error: ${error}`);
    } finally {
      await client.$disconnect();
    }
  }

  // Delete a hub
  async delete(id: string): Promise<Hub> {
    try {
      const hub = await client.hub.delete({
        where: {
          id: id
        }
      });
      return hub;
    } catch (error) {
      throw new Error(`Could not delete hub. Error: ${error}`);
    } finally {
      await client.$disconnect();
    }
  }

  // Get all studnets who belong to a hub
  async getStudents(id: string): Promise<Student[]> {
    try {
      const hub = await client.hub.findUnique({
        where: {
          id: id
        },
        include: {
          students: true
        }
      });
      if (!hub) {
        return [];
      }
      return hub.students;
    } catch (error) {
      throw new Error(`Could not get students. Error: ${error}`);
    } finally {
      await client.$disconnect();
    }
  }
}
