import mongoose from 'mongoose';

import { dbConnection } from '../src/config/database-connection';
import { env } from '../src/config/env';
import { Role } from '../src/models/role.model';
import { User } from '../src/models/user.model';
import { SYSTEMROLES } from '../src/types/systemRoles';
import { hashPassword } from '../src/utils/bcrypt';

// Seed function
async function seedAdminAccount() {
  try {
    await dbConnection(env.mongoDb.uri);

    const role = await Role.findOne({ key: SYSTEMROLES.admin });
    if (!role) {
      console.log('Admin role not found.');
      return;
    }

    const user = await User.findOne({ role: role._id });
    if (!user) {
      await User.create({
        firstName: 'Admin',
        lastName: 'Admin',
        email: 'admin@gmail.com',
        password: await hashPassword('Admin@12345'),
        role: role._id,
        system: true,
      });
      console.log('Admin user created.');
    } else {
      console.log('Admin user already exists.');
    }

    console.log('Admin seed done.');
  } catch (error) {
    console.error('Error seeding admin account:', error);
  } finally {
    await mongoose.disconnect();
  }
}

seedAdminAccount();
