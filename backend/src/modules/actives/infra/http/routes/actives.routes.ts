import { Router } from 'express';

import ActivesController from '../controllers/ActivesController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const activesRouter = Router();
const activesController = new ActivesController();

activesRouter.use(ensureAuthenticated);

activesRouter.post('/', activesController.create);

export default activesRouter;
