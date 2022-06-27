import { inject, injectable } from "tsyringe";
import Users from "@modules/users/infra/typeorm/entities/user";
import  IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import { getDate, getDaysInMonth } from "date-fns";

interface IRequest {
    user_id: string,
    month: number,
    year: number,
}

type IResponse = Array <{
    day: number;
    available: boolean
}>;

@injectable()
export default class ListMonthAvailabilityService {
    constructor(
       @inject('AppointmentsRepository')
       private appointmentsRepository: IAppointmentsRepository
    ){}

    public async execute({user_id, year, month}: IRequest): Promise<IResponse> {
        const appointments = await this.appointmentsRepository.findAllinMonthFromProvider({
            provider_id: user_id,
            year,
            month,
        },
        );

        const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

        const eachDayArray = Array.from(
            { length: numberOfDaysInMonth },
            (_, index) => index + 1,
        );

        const availability = eachDayArray.map(day => {
            const appointmentsInDay = appointments.filter(appointment => {
                return getDate(appointment.date) == day 
            });

            return {
                day,
                available: appointmentsInDay.length < 10,
            }
        });

        return availability
    }
}