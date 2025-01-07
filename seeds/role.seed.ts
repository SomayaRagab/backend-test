import mongoose from 'mongoose';

import { dbConnection } from '../src/config/database-connection';
import { env } from '../src/config/env';
import { Role } from '../src/models/role.model';
import { SYSTEMROLES } from '../src/types/systemRoles';

const adminRoleData = {
  key: SYSTEMROLES.admin,
  system: true,
};

const defaultRoleData = {
  key: SYSTEMROLES.default,
  system: true,
  permissions: [],
};

async function seedRoles() {
  try {
    await dbConnection(env.mongoDb.uri);

    // Find or create admin role
    let adminRole = await Role.findOne({ key: adminRoleData.key });
    if (!adminRole) {
      adminRole = await Role.create(adminRoleData);
      console.log('Admin role created');
    }

    // Find or create default role
    let defaultRole = await Role.findOne({ key: defaultRoleData.key });
    if (!defaultRole) {
      defaultRole = await Role.create(defaultRoleData);
      console.log('Default role created');
    }

    console.log('Role seed done');
  } catch (error) {
    console.error('Error seeding roles:', error);
  } finally {
    await mongoose.disconnect();
  }
}

seedRoles();
