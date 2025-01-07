import { PERMISSIONS } from './Permissions';

export interface IJwtPayload {
  id: string;
  role: {
    id: string;
    key: string;
    permissions: PERMISSIONS[];
  };
}
