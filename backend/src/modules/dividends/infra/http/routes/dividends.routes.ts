import { Router } from 'express';

import DividendsController from '../controllers/DividendsController';
import DividendsMonthlyController from '../controllers/DividendsMonthlyController';
import DividendsReceivableController from '../controllers/DividendsReceivableController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const dividendsRouter = Router();
const dividendsController = new DividendsController();
const dividendsReceivableController = new DividendsReceivableController();
const dividendsMonthlyController = new DividendsMonthlyController();

dividendsRouter.use(ensureAuthenticated);

dividendsRouter.get('/receivable', dividendsReceivableController.index);
dividendsRouter.get('/monthly', dividendsMonthlyController.index);
dividendsRouter.get('/', dividendsController.index);
dividendsRouter.post('/', dividendsController.store);

export default dividendsRouter;
