import { inject, injectable } from "tsyringe";

import IAppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/appointmentsRepository';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointments';

interface IAppointment {
    user_id: string,
}

@injectable()
class ListUserAppointments {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
    ) { }

    public async execute({user_id}: IAppointment): Promise<Appointment[]> {
        const appointment = await this.appointmentsRepository.findUser({user_id})

        return appointment;
    }
}


export default ListUserAppointments