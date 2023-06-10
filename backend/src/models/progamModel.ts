import client from '../database';
import { Program } from '@prisma/client';

// Define the class that represents the program model
export class ProgramStore {
  // Get all programs
  async index(): Promise<Program[]> {
    try {
      const programs = await client.program.findMany();
      return programs;
    } catch (error) {
      throw new Error(`Could not get programs. Error: ${error}`);
    }
  }

  // Get a program by id
  async show(id: string): Promise<Program | null> {
    try {
      const program = await client.program.findUnique({
        where: {
          id: id
        }
      });
      return program;
    } catch (error) {
      throw new Error(`Could not find program ${id}. Error: ${error}`);
    } finally {
      await client.$disconnect();
    }
  }

  // Create a new program
  async create(name: string): Promise<Program> {
    try {
      const program = await client.program.create({
        data: {
          name
        }
      });
      return program;
    } catch (error) {
      throw new Error(`Could not create program. Error: ${error}`);
    } finally {
      await client.$disconnect();
    }
  }

  // Update a program
  async update(id: string, name: string): Promise<Program> {
    try {
      const program = await client.program.update({
        where: {
          id: id
        },
        data: {
          name
        }
      });
      return program;
    } catch (error) {
      throw new Error(`Could not update program ${id}. Error: ${error}`);
    } finally {
      await client.$disconnect();
    }
  }

  // Delete a program
  async delete(id: string): Promise<Program> {
    try {
      const program = await client.program.delete({
        where: {
          id: id
        }
      });
      return program;
    } catch (error) {
      throw new Error(`Could not delete program ${id}. Error: ${error}`);
    } finally {
      await client.$disconnect();
    }
  }

  // Show program by its name
  async showByName(name: string): Promise<Program | null> {
    try {
      const program = await client.program.findUnique({
        where: {
          name: name
        }
      });
      return program;
    } catch (error) {
      throw new Error(`Could not find program ${name}. Error: ${error}`);
    } finally {
      await client.$disconnect();
    }
  }
}
