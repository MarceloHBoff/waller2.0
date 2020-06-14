import { Router } from 'express';

import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';
import { PasswordForgot, PasswordReset } from '../validators/Password';

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post('/forgot', PasswordForgot, forgotPasswordController.create);
passwordRouter.post('/reset', PasswordReset, resetPasswordController.create);

export default passwordRouter;
