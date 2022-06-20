import { container } from 'tsyringe';
import { parseISO } from 'date-fns';
import { Request, Response } from 'express'; 

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppoitmentController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { provider_id, date } = request.body;

        const dateISO = parseISO(date); 
    
        const createAppointments = container.resolve(CreateAppointmentService);
       
        const appointments = await createAppointments.execute({date : dateISO, provider_id : provider_id})
    
        return response.json(appointments);
    }
}