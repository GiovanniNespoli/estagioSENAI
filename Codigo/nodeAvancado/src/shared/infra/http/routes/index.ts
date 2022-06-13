import { Router } from "express";
import appointmentsRouter from "@modules/appointments/infra/http/routes/appointments.routes";
import usersRouter from "@modules/users/infra/http/routes/users.routes";
import sessiosnRoute from "@modules/users/infra/http/routes/sessions.routes";

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


export default routes;