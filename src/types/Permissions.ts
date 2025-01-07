export enum PERMISSIONS {
  // auth permissions
  createUser = 'create user',
  updateUser = 'update user',
  deleteUser = 'delete user',
  getUsers = 'get users',
  getUser = 'get user',

  // roles permissions
  createRole = 'create role',
  updateRole = 'update role',
  getRole = 'get role',
  getRoles = 'get roles',
  deleteRole = 'delete role',
  getPermissions = 'get permissions',

  // products permissions
  createProduct = 'create product',
  updateProduct = 'update product',
  deleteProduct = 'delete product',
}

export const permissions = {
  auth: [
    PERMISSIONS.createUser,
    PERMISSIONS.updateUser,
    PERMISSIONS.getUsers,
    PERMISSIONS.getUser,
    PERMISSIONS.deleteUser,
  ],
  roles: [
    PERMISSIONS.createRole,
    PERMISSIONS.updateRole,
    PERMISSIONS.getRole,
    PERMISSIONS.deleteRole,
    PERMISSIONS.getPermissions,
  ],
  products: [PERMISSIONS.createProduct, PERMISSIONS.updateProduct, PERMISSIONS.deleteProduct],
};
