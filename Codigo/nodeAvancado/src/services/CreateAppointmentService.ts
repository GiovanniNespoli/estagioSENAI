import Appointment from "../models/Appointments";
import AppointmentsRepository from "../repositories/appointmentsRepository";
import { startOfHour } from "date-fns";

interface RequestDTO {
    provider : string,
    date : Date;
}

export default class CreateAppointmentService
{
    private appointmentsRepository : AppointmentsRepository;

    /**Dependency Inversion (SOLID) */
    constructor(appointmentsRepository : AppointmentsRepository)
    {
        this.appointmentsRepository = appointmentsRepository;
    }

    public execute({date, provider}: RequestDTO) : Appointment
    {
        const parsedDate = startOfHour(date);

        /**percorre o array usando o find
         * usa a função isEqual (funcao do date-fns) para verificacao do date
         * ele passa por cada dado do array procurando se há algum date existente ao que está 
         * sendo passado no body
        */
        const findAppintInSameDate = this.appointmentsRepository.findByDate(parsedDate);
    
        if ( findAppintInSameDate !== null ) {
            throw Error('This appointment is already booked');
        };
    
        /**Puxamos o metodo do nosso repository e passamos de 
         * parametro no metodo create os dados requisitados e já 
         * tratado para o cadastro
         */
        const newAppoints = this.appointmentsRepository.create({
            provider : provider,
            date : parsedDate
        });

        return newAppoints;
    }
}