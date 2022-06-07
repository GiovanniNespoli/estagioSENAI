import { Router } from "express";
import appointmentsRouter from "./appointments.routes";
import usersRouter from "./users.routes";

const routes = Router();

/**
 * Toda rota q inicia com /appointments vai ser mandada para o
 * appointmentsRouter, 
 * ajuda a economizar codigo, ja que no appointmentsRouter
 * nas requisições http n precisaremos passar /appointments
 * */
routes.use('/users', usersRouter);
routes.use('/appointments', appointmentsRouter)


export default routes;