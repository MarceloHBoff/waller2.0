import { Router } from 'express';

import UserActivesController from '../controllers/UserActivesController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const userActivesRouter = Router();
const userActivesController = new UserActivesController();

userActivesRouter.use(ensureAuthenticated);

userActivesRouter.post('/', userActivesController.create);
userActivesRouter.get('/', userActivesController.index);
userActivesRouter.put('/', userActivesController.update);

export default userActivesRouter;
