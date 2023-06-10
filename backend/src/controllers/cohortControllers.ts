import { CohortStore } from '../models/cohortModel';
import { Request, Response } from 'express';
import { ProgramStore } from '../models/progamModel';

// Create a new instance of the CohortStore class.
const cohortStore = new CohortStore();
// Create a new instance of the ProgramStore class
const programStore = new ProgramStore();
const expectedData = ['programId', 'name'];
// Define the cohort controller.
export const cohortController = {
  // Define the createCohort method.
  async createCohort(req: Request, res: Response) {
    try {
      // Get the cohort name from the request body.
      const cohortData = req.body;
      // Check if the cohort name is empty.
      if (!cohortData.name || !cohortData.programId) {
        // Return an error.
        return res
          .status(400)
          .json({ error: 'Cohort name and programId is required' });
      }
      // Check if there is any unexpected data.
      const unexpectedData = Object.keys(cohortData).filter(
        (key) => !expectedData.includes(key)
      );
      // If there is unexpected data.
      if (unexpectedData.length > 0) {
        // Return an error.
        return res.status(400).json({ error: 'Unexpected data' });
      }
      // Check if the cohort name already exists.
      const cohorts = await cohortStore.index();
      // Filter the cohorts by name.
      const existingCohort = cohorts.filter(
        (cohort) => cohort.name === cohortData.name
      );
      // If the cohort name already exists.
      if (existingCohort.length > 0) {
        // Return an error.
        return res.status(400).json({ error: 'Cohort name already exists' });
      }

      // Check if the program exists.
      const program = await programStore.show(cohortData.programId);
      // If the program does not exist.
      if (!program) {
        // Return an error.
        return res.status(400).json({ error: 'Program not found' });
      }

      // Create a new cohort.
      const cohort = await cohortStore.create(cohortData);

      // Return the cohort.
      return res.json(cohort);
    } catch (error) {
      // Return an error.
      return res.status(500).json({ error: error });
    }
  },

  // Delete a cohort
  async deleteCohort(req: Request, res: Response) {
    try {
      // Get the cohort id from the request params.
      const { id } = req.params;
      // Check if the cohort exists.
      const cohort = await cohortStore.show(id);
      // If the cohort does not exist.
      if (!cohort) {
        // Return an error message.
        return res.status(404).json({ error: 'Cohort not found' });
      }
      // Delete the cohort.
      const deletedCohort = await cohortStore.delete(id);
      // Return the cohort.
      return res.json(deletedCohort);
    } catch (error) {
      // Return an error message.
      return res.status(500).json(error);
    }
  },

  // Update a cohort
  async updateCohort(req: Request, res: Response) {
    try {
      // Get the cohort id from the request params.
      const { id } = req.params;
      // Get the cohort data from the request body.
      const cohortData = req.body;
      // Check if the cohort exists.
      const cohort = await cohortStore.show(id);
      // If the cohort does not exist.
      if (!cohort) {
        // Return an error message.
        return res.status(404).json({ error: 'Cohort not found' });
      }
      // Update the cohort.
      const updatedCohort = await cohortStore.update(id, cohortData);
      // Return the cohort.
      return res.json(updatedCohort);
    } catch (error) {
      // Return an error message.
      return res.status(500).json(error);
    }
  },

  // Get all chortes
  async listCohorts(req: Request, res: Response) {
    try {
      // Get all the cohorts
      const cohorts = await cohortStore.index();
      // Return the cohorts
      return res.json(cohorts);
    } catch (error) {
      // Return an error message
      return res.status(500).json(error);
    }
  },

  // Get a single Cohort model.
  async getCohort(req: Request, res: Response) {
    try {
      // Get the cohort id from the request params
      const { id } = req.params;
      const cohort = await cohortStore.show(id);
      // If the cohort does not exist
      if (!cohort) {
        // Return an error message
        return res.status(404).json({ error: 'Cohort not found' });
      }
      // Return the cohort
      return res.json(cohort);
    } catch (error) {
      // Return an error message
      return res.status(500).json(error);
    }
  }
};
