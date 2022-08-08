import { inject, injectable } from "tsyringe";
import { classToClass } from "class-transformer";

import IAppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/appointmentsRepository';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointments';
import ICacheProvider from "@shared/container/providers/CacheProvider/models/ICacheProvider";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import User from "@modules/users/infra/typeorm/entities/user";

interface IAppointment {
    user_id: string,
    year: number,
    month: number,
    day: number,
}

@injectable()
class ListUserAppointments {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,

        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) { }

    public async execute({ user_id, year, month, day }: IAppointment): Promise<Appointment[]>{

        console.log(user_id, year, month, day + "obj Service");
        const appointment = await this.appointmentsRepository.findUser({ user_id, year, month, day })

        const cacheKey = `providers-list:${user_id}`;

        let users = await this.cacheProvider.recover<User[]>(cacheKey);

        if (!users) {
            users = await this.usersRepository.findAllProviders({
                except_user_id: user_id,
            });

            await this.cacheProvider.save({ key: cacheKey, value: classToClass(users) });
        }

        return appointment;
    }
}


export default ListUserAppointments