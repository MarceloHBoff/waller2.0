import { Router } from 'express';

import UserActivesController from '../controllers/UserActivesController';
import { UserActivesPost } from '../validators/UserActives';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const userActivesRouter = Router();
const userActivesController = new UserActivesController();

userActivesRouter.use(ensureAuthenticated);

userActivesRouter.post('/', UserActivesPost, userActivesController.create);
userActivesRouter.get('/', userActivesController.index);
userActivesRouter.put('/', userActivesController.update);

export default userActivesRouter;
