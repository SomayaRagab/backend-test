import express from 'express';

import * as controllers from '../controllers/auth';
import * as val from '../validations/auth.validation';

export const router = express.Router();

router.route('/login').post(val.login, controllers.loginHandler);

router.route('/signup').post(val.signup, controllers.signupHandler);

