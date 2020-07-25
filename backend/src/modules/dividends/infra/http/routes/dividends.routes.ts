import { Router } from 'express';

import DividendsController from '../controllers/DividendsController';
// import { UserBondsPost } from '../validators/Dividend';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const dividendsRouter = Router();
const dividendsController = new DividendsController();

dividendsRouter.use(ensureAuthenticated);

dividendsRouter.get('/', dividendsController.index);
dividendsRouter.post('/', dividendsController.store);

export default dividendsRouter;
