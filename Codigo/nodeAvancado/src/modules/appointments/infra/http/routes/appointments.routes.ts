import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthentication from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppoitmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';
import AppListController from '../controllers/AppListController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();
const appListController = new AppListController();

appointmentsRouter.use(ensureAuthentication);

appointmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date(),
    },
  }),
  appointmentsController.create,
);
appointmentsRouter.get('/me', appListController.index);

export default appointmentsRouter;