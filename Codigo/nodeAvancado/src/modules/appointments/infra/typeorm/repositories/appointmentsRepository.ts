import { getRepository, Raw, Repository } from 'typeorm'

import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository'

import Appointment from "@modules/appointments/infra/typeorm/entities/Appointments";
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllinDayFromProviderDTO from '@modules/appointments/dtos/IFindAllinDayFromProviderDTO';
import IFindUserDTO from '@modules/appointments/dtos/IFindUserDTO';

export default class AppointmentsRepository implements IAppointmentRepository {
    private ormRepository: Repository<Appointment>;

    constructor() {
        this.ormRepository = getRepository(Appointment);
    }


    public async findUser({ user_id, year, month, day }: IFindUserDTO): Promise<Appointment[]> {

        const parsedDay = String(day).padStart(2, '0');
        const parsedMonth = String(month).padStart(2, '0');

        const findUser = await this.ormRepository.find({

            relations: ['user', 'provider'],
            where: {
                user_id: user_id,
                date: Raw(dateFieldName =>
                    `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`),
            },
            order: {
                date: "DESC",
            },
        });

        return findUser
    }

    /**
     * Toda vez em que criamos uma função async await
     * o retorno vira uma promise => Promise<Appointments | null>
     * .then(response => )
     */
    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const findDate = await this.ormRepository.findOne({
            where: { date },
        });

        return findDate;
    }

    public async findAllinMonthFromProvider({ provider_id, month, year }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
        const parsedMonth = String(month).padStart(2, '0');

        const appointments = await this.ormRepository.find({
            where: {
                provider_id,
                date: Raw(dateFielName =>
                    `to_char(${dateFielName}, 'MM-YYYY') = '${parsedMonth}-${year}'`),
            },
            relations: ['user']
        });

        return appointments;
    }

    public async create({ provider_id, date, user_id }: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = this.ormRepository.create({ provider_id, date, user_id });

        await this.ormRepository.save(appointment);

        return appointment;
    }

    public async findAllinDayFromProvider({ provider_id, day, month, year }: IFindAllinDayFromProviderDTO): Promise<Appointment[]> {
        const parsedDay = String(day).padStart(2, '0');
        const parsedMonth = String(month).padStart(2, '0');

        const appointments = await this.ormRepository.find({
            where: {
                provider_id,
                date: Raw(dateFielName =>
                    `to_char(${dateFielName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`),
            },
            relations: ['user']
        });

        console.log(appointments);

        return appointments;
    }

};
