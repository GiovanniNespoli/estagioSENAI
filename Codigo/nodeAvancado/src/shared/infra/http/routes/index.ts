import { Router } from "express";
import appointmentsRouter from "@modules/appointments/infra/http/routes/appointments.routes";
import usersRouter from "@modules/users/infra/http/routes/users.routes";
import sessiosnRoute from "@modules/users/infra/http/routes/sessions.routes";
import passwordRouter from "@modules/users/infra/http/routes/password.routes";
import profileRouter from "@modules/users/infra/http/routes/profile.routes";
import providerRouter from "@modules/appointments/infra/http/routes/providers.routes";

const routes = Router();

/**
 * Toda rota q inicia com /appointments vai ser mandada para o
 * appointmentsRouter, 
 * ajuda a economizar codigo, ja que no appointmentsRouter
 * nas requisições http n precisaremos passar /appointments
 * */
routes.use('/appointments', appointmentsRouter)
routes.use('/users', usersRouter);
routes.use('/sessions', sessiosnRoute);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/providers', providerRouter);


export default routes;