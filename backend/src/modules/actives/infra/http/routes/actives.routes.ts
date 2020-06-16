import { Router } from 'express';

import ActivesController from '../controllers/ActivesController';

const activesRouter = Router();
const activesController = new ActivesController();

activesRouter.post('/', activesController.create);

export default activesRouter;
