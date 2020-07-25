import { Router } from 'express';

import DividendsController from '../controllers/DividendsController';
import DividendsReceivableController from '../controllers/DividendsReceivableController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const dividendsRouter = Router();
const dividendsController = new DividendsController();
const dividendsReceivableController = new DividendsReceivableController();

dividendsRouter.use(ensureAuthenticated);

dividendsRouter.get('/receivable', dividendsReceivableController.index);
dividendsRouter.get('/', dividendsController.index);
dividendsRouter.post('/', dividendsController.store);

export default dividendsRouter;
