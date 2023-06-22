import { Request, Response } from 'express';
import { ProgramStore } from '../models/progamModel';

// Create an instance of the program model
const programStore = new ProgramStore();

// Define the program controller
export const programController = {
  // Define the create method
  async createProgram(req: Request, res: Response) {
    try {
      // Get the program name from the request body
      const { name } = req.body;

      // Check if the program name is empty
      if (!name) {
        // Return an error
        return res.status(400).json({ error: 'Program name is required' });
      }

      // Check if the program name already exists
      const existingProgram = await programStore.showByName(name);

      // If the program name already exists
      if (existingProgram) {
        // Return an error
        return res.status(400).json({ error: 'Program name already exists' });
      }
      // Check if there is another argument in the request body other than the program name
      if (Object.keys(req.body).length > 1) {
        // Return an error
        return res.status(400).json({ error: 'Only name is required' });
      }
      const program = await programStore.create(name);
      // Return the program
      return res.json(program);
    } catch (error) {
      // Return an error
      return res.status(500).json({ error: error });
    }
  },

  // Define the getProgram method
  async getProgram(req: Request, res: Response) {
    try {
      // Get the program id from the request params
      const { id } = req.params;
      const program = await programStore.show(id);
      // If the program does not exist
      if (!program) {
        // Return an error message
        return res.status(404).json({ error: 'Program not found' });
      }
      // Return the program
      return res.json(program);
    } catch (error) {
      // Return an error message
      return res.status(500).json(error);
    }
  },

  // Define the getPrograms method
  async listPrograms(req: Request, res: Response) {
    try {
      // Get all the programs
      const programs = await programStore.index();
      // Return the programs
      return res.json(programs);
    } catch (error) {
      // Return an error
      return res.status(500).json({ error });
    }
  },

  // Define the updateProgram method
  async updateProgram(req: Request, res: Response) {
    try {
      // Get the program id from the request params
      const { id } = req.params;
      // Check if the progarm with the given id exists
      const program = await programStore.show(id);
      // If the program does not exist
      if (!program) {
        // Return an error message
        return res.status(404).json({ error: 'Program not found' });
      }
      // Get the program name from the request body
      const { name } = req.body;

      // Check if the program name is empty
      if (!name) {
        // Return an error
        return res.status(400).json({ error: 'Program name is required' });
      }
      // Check if the program name already exists
      const existingProgram = await programStore.showByName(name);
      // If the program name already exists
      if (existingProgram) {
        // Return an error
        return res.status(400).json({ error: 'Program name already exists' });
      }
      // Update the program
      const updatedProgram = await programStore.update(id, name);
      // Return the program
      return res.json(updatedProgram);
    } catch (error) {
      // Return an error message
      return res.status(500).json({ error });
    }
  },

  // Define the deleteProgram method
  async deleteProgram(req: Request, res: Response) {
    try {
      // Get the program id from the request params
      const { id } = req.params;
      // Check if the progarm with the given id exists
      const program = await programStore.show(id);
      // If the program does not exist
      if (!program) {
        // Return an error message
        return res.status(404).json({ error: 'Program not found' });
      }
      // Delete the program
      await programStore.delete(id);
      // Return a success message
      return res.json({ message: 'Program deleted successfully' });
    } catch (error) {
      // Return an error message
      return res.status(500).json({ error: error });
    }
  }
};
