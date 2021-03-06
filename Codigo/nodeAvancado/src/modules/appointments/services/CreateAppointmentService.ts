import { getHours, isBefore, startOfHour } from "date-fns";
import { inject, injectable } from "tsyringe";

import Appointment from "@modules/appointments/infra/typeorm/entities/Appointments";
import IAppointmentRepository from '../repositories/IAppointmentsRepository';
import AppError from '@shared/errors/AppError';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/appointmentsRepository';


interface IRequestDTO {
    provider_id: string,
    user_id: string
    date: Date;
}

@injectable()
export default class CreateAppointmentService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentRepository) { }

    public async execute({ date, provider_id, user_id }: IRequestDTO): Promise<Appointment> {

        const parsedDate = startOfHour(date);

        //isBefore verifica se uma data é anterior a outra 
        if (isBefore(parsedDate, Date.now())) {
            throw new AppError("You can't create an a appointment on a past date");
        }

        if (user_id == provider_id) {
            throw new AppError('You can not create a appointment with yourself')
        };

        if (getHours(parsedDate) < 8 || getHours(parsedDate) > 17) {
            throw new AppError('You can only create appointment between 8pm and 17pm')
        }
        /**percorre o array usando o find
         * usa a função isEqual (funcao do date-fns) para verificacao do date
         * ele passa por cada dado do array procurando se há algum date existente ao que está 
         * sendo passado no body
        */
        const findAppintInSameDate = await this.appointmentsRepository.findByDate(parsedDate);

        if (findAppintInSameDate) {
            throw new AppError('This appointment is already booked');
        };

        /**Puxamos o metodo do nosso repository e passamos de 
         * parametro no metodo create os dados requisitados e já 
         * tratado para o cadastro
         */
        const newAppoints = await this.appointmentsRepository.create({
            provider_id: provider_id,
            user_id,
            date: parsedDate
        });

        return newAppoints;
    }
}