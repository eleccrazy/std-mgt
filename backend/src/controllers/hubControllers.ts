import { HubStore } from '../models/hubModel';
import { Request, Response } from 'express';

// Create an instance of a HubStore class
const hubStore = new HubStore();

// Define the hub controller
export const hubController = {
  // Define the createHub method
  async createHub(req: Request, res: Response) {
    try {
      // Get the hub name from the request body
      const { name } = req.body;

      // Check if the hub name is empty
      if (!name) {
        // Return an error
        return res.status(400).json({ error: 'Hub name is required' });
      }

      // Check if the hub name already exists
      const existingHub = await hubStore.showByName(name);

      // If the hub name already exists
      if (existingHub) {
        // Return an error
        return res.status(400).json({ error: 'Hub name already exists' });
      }
      const hub = await hubStore.create(name);
      // Return the hub
      return res.json(hub);
    } catch (error) {
      // Return an error
      return res.status(500).json({ error: error });
    }
  },

  // Define the getHub method
  async getHub(req: Request, res: Response) {
    try {
      // Get the hub id from the request params
      const { id } = req.params;
      const hub = await hubStore.show(id);
      // If the hub does not exist
      if (!hub) {
        // Return an error message
        return res.status(404).json({ error: 'Hub not found' });
      }
      // Return the hub
      return res.json(hub);
    } catch (error) {
      // Return an error message
      return res.status(500).json(error);
    }
  },

  // Define the getHubs method
  async listHubs(req: Request, res: Response) {
    try {
      // Get all the hubs
      const hubs = await hubStore.index();
      // Return the hubs
      return res.json(hubs);
    } catch (error) {
      // Return an error message
      return res.status(500).json(error);
    }
  },

  // Define the updateHub method
  async updateHub(req: Request, res: Response) {
    try {
      // Get the hub id from the request params
      const { id } = req.params;
      // Get the hub name from the request body
      const { name } = req.body;
      // Check if the hub name is empty
      if (!name) {
        // Return an error
        return res.status(400).json({ error: 'Hub name is required' });
      }
      // Check if the hub name already exists
      const existingHub = await hubStore.showByName(name);
      // If the hub name already exists
      if (existingHub) {
        // Return an error
        return res.status(400).json({ error: 'Hub name already exists' });
      }
      const hub = await hubStore.update(id, name);
      // Return the hub
      return res.json(hub);
    } catch (error) {
      // Return an error message
      return res.status(500).json(error);
    }
  },

  // Define the deleteHub method
  async deleteHub(req: Request, res: Response) {
    try {
      // Get the hub id from the request params
      const { id } = req.params;
      const hubExists = await hubStore.show(id);
      // If the hub does not exist
      if (!hubExists) {
        // Return an error message
        return res.status(404).json({ error: 'Hub not found' });
      }
      // Delete the hub
      const hub = await hubStore.delete(id);
      // Return the hub
      return res.json(hub);
    } catch (error) {
      // Return an error message
      return res.status(500).json(error);
    }
  }
};
