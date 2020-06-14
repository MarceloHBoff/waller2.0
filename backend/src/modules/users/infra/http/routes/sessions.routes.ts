import { Router } from 'express';

import SessionsController from '../controllers/SessionController';
import { SessionPost } from '../validators/Session';

const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.post('/', SessionPost, sessionsController.create);

export default sessionsRouter;
