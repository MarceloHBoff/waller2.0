import { Router } from 'express';

import UserBondsController from '../controllers/UserBondsController';
import { UserBondsPost } from '../validators/UserBonds';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const userBondsRouter = Router();
const userBondsController = new UserBondsController();

userBondsRouter.use(ensureAuthenticated);

userBondsRouter.post('/', UserBondsPost, userBondsController.create);
// userBondsRouter.get('/', userActivesController.index);

export default userBondsRouter;
