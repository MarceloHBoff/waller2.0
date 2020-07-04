import { Router } from 'express';

import activesRouter from '@modules/actives/infra/http/routes/actives.routes';
import CEIRouter from '@modules/actives/infra/http/routes/CEI.routes';
import userActivesRouter from '@modules/actives/infra/http/routes/userActives.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import sessionRouter from '@modules/users/infra/http/routes/sessions.routes';
import userRouter from '@modules/users/infra/http/routes/users.routes';

const routes = Router();

routes.use('/users', userRouter);
routes.use('/sessions', sessionRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);

routes.use('/actives', activesRouter);
routes.use('/userActives', userActivesRouter);
routes.use('/cei', CEIRouter);

export default routes;
