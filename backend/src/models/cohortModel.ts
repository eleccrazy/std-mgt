import client from '../database';
import { Cohort } from '@prisma/client';

// Define the class that represents the Cohort model
export class CohortStore {
  // Get all Cohort models.
  async index(): Promise<Cohort[]> {
    try {
      const cohorts = await client.cohort.findMany();
      return cohorts;
    } catch (error) {
      throw new Error(`Could not get cohorts. Error: ${error}`);
    } finally {
      await client.$disconnect();
    }
  }

  // Get a single Cohort model.
  async show(id: string): Promise<Cohort | null> {
    try {
      const cohort = await client.cohort.findUnique({
        where: {
          id: id
        }
      });
      return cohort;
    } catch (error) {
      throw new Error(`Could not find cohort ${id}. Error: ${error}`);
    } finally {
      await client.$disconnect();
    }
  }

  // Create a new Cohort model.
  async create(cohortData: Cohort): Promise<Cohort> {
    try {
      const cohort = await client.cohort.create({
        data: cohortData
      });
      return cohort;
    } catch (error) {
      throw new Error(`Could not create cohort. Error: ${error}`);
    } finally {
      await client.$disconnect();
    }
  }

  // Update a Cohort model.
  async update(id: string, cohortData: Cohort): Promise<Cohort> {
    try {
      const cohort = await client.cohort.update({
        where: {
          id: id
        },
        data: cohortData
      });
      return cohort;
    } catch (error) {
      throw new Error(`Could not update cohort ${id}. Error: ${error}`);
    } finally {
      await client.$disconnect();
    }
  }

  // Delete a Cohort model.
  async delete(id: string): Promise<Cohort> {
    try {
      const cohort = await client.cohort.delete({
        where: {
          id: id
        }
      });
      return cohort;
    } catch (error) {
      throw new Error(`Could not delete cohort ${id}. Error: ${error}`);
    } finally {
      await client.$disconnect();
    }
  }
}
