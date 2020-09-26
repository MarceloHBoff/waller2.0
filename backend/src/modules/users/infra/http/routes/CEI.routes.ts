import { Router } from 'express';

import CEIController from '../controllers/CEIController';
import { CEICreate } from '../validators/CEI';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const CEIRouter = Router();
const ceiController = new CEIController();

CEIRouter.use(ensureAuthenticated);

CEIRouter.post('/', CEICreate, ceiController.create);

export default CEIRouter;
