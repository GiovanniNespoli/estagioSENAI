import { startOfHour } from "date-fns";

import Appointment from "@modules/appointments/infra/typeorm/entities/Appointments";
import IAppointmentRepository from '../repositories/IAppointmentsRepository';
import AppError from '@shared/errors/AppError';


interface IRequestDTO {
    provider_id : string,
    date : Date;
}

export default class CreateAppointmentService
{

    constructor(private appointmentsRepository: IAppointmentRepository){}

    public async execute({date, provider_id}: IRequestDTO) : Promise<Appointment>{

        const parsedDate = startOfHour(date);

        /**percorre o array usando o find
         * usa a função isEqual (funcao do date-fns) para verificacao do date
         * ele passa por cada dado do array procurando se há algum date existente ao que está 
         * sendo passado no body
        */
        const findAppintInSameDate = await this.appointmentsRepository.findByDate(parsedDate);
    
        if ( findAppintInSameDate ) 
        {
            throw new AppError('This appointment is already booked');
        };
    
        /**Puxamos o metodo do nosso repository e passamos de 
         * parametro no metodo create os dados requisitados e já 
         * tratado para o cadastro
         */
        const newAppoints = await this.appointmentsRepository.create({
            provider_id : provider_id,
            date : parsedDate
        });

        return newAppoints;
    }
}