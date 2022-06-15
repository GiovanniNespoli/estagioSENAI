/**Criamos esse repositorio fake
 * já que os teste unitários não podem ter 
 * relações com depêndencias como libs externas ou arquivos internos do proj,
 * então é criado esse repository com as mesmas funções do original para 
 * testarmos , e conseguimos fazer esse teste graças ao array criado para 
 * armazenar os dados ( já que não podemos conctar ao bando de dados )
 */

import { uuid } from 'uuidv4';

import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository'

import Appointment from "@modules/appointments/infra/typeorm/entities/Appointments";
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

export default class AppointmentsRepository implements IAppointmentRepository{
    private appointments: Appointment[] = [];


    public async findByDate(date : Date) : Promise<Appointment | undefined>
    {
        const findAppointment = this.appointments.find(appointments => appointments.date == date);
        return findAppointment;
    }

    public async create({provider_id , date}: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = new Appointment();

        /**
         *  appointment.id = uuid();
         *  appointment.date = date;
         *  appointment.provider_id = provider_id;
         */
        Object.assign(appointment, { id: uuid() }, date, provider_id);

        

        this.appointments.push(appointment);

        return appointment;
    }

};