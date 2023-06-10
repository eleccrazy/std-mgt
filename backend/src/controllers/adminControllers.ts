import { Request, Response } from 'express';
import { AdminStore } from '../models/adminModel';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Get the salt rounds and the papper from the environment variables.
const papper = process.env.PAPPER as string;
const saltRounds = process.env.SALT_ROUNDS as string;

// Create an instance of the admin model
const adminStore = new AdminStore();

// Expected admin data. No other data is allowed to sent by the client
const expectedData = ['firstName', 'lastName', 'email', 'password', 'role'];
// Define the admin controller
export const adminController = {
  // Define the getAdmins method
  async getAdmins(req: Request, res: Response) {
    try {
      // Get all the admins
      const admins = await adminStore.index();
      // Return the admins
      return res.json(admins);
    } catch (error) {
      // Return an error
      return res.status(500).json({ error });
    }
  },

  // Define the getAdmin method
  async getAdmin(req: Request, res: Response) {
    try {
      // Get the admin id from the request params
      const { id } = req.params;
      const admin = await adminStore.show(id);
      // If the admin does not exist
      if (!admin) {
        // Return an error message
        return res.status(404).json({ error: 'Admin not found' });
      }
      // Remove the password from the admin object
      const { password, ...adminWithoutPassword } = admin;
      // Return the admin
      return res.json(adminWithoutPassword);
    } catch (error) {
      // Return an error message
      return res.status(500).json(error);
    }
  },

  // Define the create method
  async createAdmin(req: Request, res: Response) {
    try {
      // Get the admin name from the request body
      const adminData = req.body;

      // Validate admin data
      if (!adminData.email || !adminData.password) {
        // Return an error
        return res
          .status(400)
          .json({ error: 'Admin email and password are required' });
      }

      // Get all keys of a request
      const keys = Object.keys(req.body);
      for (const key of keys) {
        if (!expectedData.includes(key)) {
          return res.status(400).json({
            error: `${key} is not an attribute of the admin object. Please send only ${expectedData}`
          });
        }
      }

      // Check if the admin email aleady exists
      const existingAdmin = await adminStore.showByEmail(adminData.email);
      // Check if admin exits
      if (existingAdmin) {
        // Return an error
        return res.status(400).json({ error: 'Admin already exists' });
      }

      // Check if the email is valid
      if (!validator.isEmail(adminData.email)) {
        // Return an error
        return res.status(400).json({ error: 'Invalid email' });
      }

      // Check the length of the password
      if (adminData.password.length < 8) {
        // Return an error
        return res
          .status(400)
          .json({ error: 'Password must be at least 8 characters' });
      }

      // Check the complexity of the password
      if (!validator.isStrongPassword(adminData.password)) {
        // Return an error
        return res.status(400).json({ error: 'Password is not strong enough' });
      }

      // Check the type of admin role
      if (adminData.role) {
        if (!(adminData.role === 'Admin' || adminData.role === 'Attendant')) {
          // Return an error
          return res
            .status(400)
            .json({ error: 'role must be either Admin or Attendant' });
        }
      }

      // Hash the password.
      const passwordDigest = await bcrypt.hashSync(
        (adminData.password as unknown as string) + papper,
        Number(saltRounds)
      );

      // Update the encrypted password
      adminData.password = passwordDigest;

      const admin = await adminStore.create(adminData);

      // Create a token.
      let token = jwt.sign(
        { id: admin.id, email: admin.email, role: admin.role },
        String(process.env.JWT_SECRET)
      );
      // Remove the password from the admin object
      const { password, ...adminWithoutPassword } = admin;

      // Return the admin
      return res.json({ token: token, admin: adminWithoutPassword });
    } catch (error) {
      // Return an error
      return res.status(500).json({ error });
    }
  },

  // Define the update method
  async updateAdmin(req: Request, res: Response) {
    try {
      // Get the admin id from the request params
      const { id } = req.params;
      // Get the admin data from the request body
      const adminData = req.body;
      // Get all keys of a request
      const keys = Object.keys(req.body);
      for (const key of keys) {
        if (!expectedData.includes(key)) {
          return res.status(400).json({
            error: `${key} is not an attribute of the admin object. Please send only ${[
              ...expectedData
            ]}`
          });
        }
      }
      const admin = await adminStore.update(id, adminData);
      // Remove the password from the admin object
      const { password, ...adminWithoutPassword } = admin;
      // Return the admin
      return res.json(adminWithoutPassword);
    } catch (error) {
      // Return an error
      return res.status(500).json({ Error: error });
    }
  },

  // Define a signIn method
  async logInAdmin(req: Request, res: Response) {
    try {
      // Get the admin data from the request body
      const adminData = req.body;
      // Validate admin data
      if (!adminData.email || !adminData.password) {
        // Return an error
        return res
          .status(400)
          .json({ error: 'Admin email and password are required' });
      }

      // Check if the admin email aleady exists
      const existingAdmin = await adminStore.showByEmail(adminData.email);
      // Check if admin exits
      if (!existingAdmin) {
        // Return an error
        return res.status(400).json({ error: 'Incorrect credential' });
      }

      // Check if the password is correct
      const passwordCorrect = await bcrypt.compare(
        adminData.password + papper,
        existingAdmin.password
      );

      if (!passwordCorrect) {
        // Return an error
        return res.status(400).json({ error: 'Incorrect credential' });
      }

      // Create a token.
      let token = jwt.sign(
        {
          id: existingAdmin.id,
          email: existingAdmin.email,
          role: existingAdmin.role
        },
        String(process.env.JWT_SECRET)
      );

      // Remove the password from the admin object
      const { password, ...adminWithoutPassword } = existingAdmin;

      // Return the admin
      return res.json({ token: token, admin: adminWithoutPassword });
    } catch (error) {
      // Return an error
      return res.status(500).json({ error });
    }
  }
};
