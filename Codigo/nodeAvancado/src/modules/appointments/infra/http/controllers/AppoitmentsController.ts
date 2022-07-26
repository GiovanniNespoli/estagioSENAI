import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppoitmentController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { provider_id, date } = request.body;
        const { id: user_id } = request.user;

        const createAppointments = container.resolve(CreateAppointmentService);

        //quando desestruturamos por exemplo = {} a ordem dos valores colocados não importa!!
        const appointments = await createAppointments.execute({
            date,
            provider_id,
            user_id
        })

        return response.json(appointments);
    }
}