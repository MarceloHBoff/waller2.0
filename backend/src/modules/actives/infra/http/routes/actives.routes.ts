import { Router } from 'express';

import ActivesController from '../controllers/ActivesController';
import { ActivesPost } from '../validators/Actives';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const activesRouter = Router();
const activesController = new ActivesController();

activesRouter.use(ensureAuthenticated);

activesRouter.post('/', ActivesPost, activesController.create);

export default activesRouter;
