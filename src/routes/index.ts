import { Application } from 'express';

import { router as authRoutes } from './auth.route';
import { router as productRoutes } from './product.route';
import { router as roleRoutes } from './role.route';
import { router as userRoutes } from './user.route';

export const mountRoutes = (app: Application) => {
  console.log('mounting routes');
  app.use('/auth', authRoutes);
  app.use('/roles', roleRoutes);
  app.use('/products', productRoutes);
  app.use('/users', userRoutes);

  app.use('*', (req, res) => {
    res.status(404).json({ message: 'route not found please check it again' });
  });
};
