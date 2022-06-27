import Appointment from '../infra/typeorm/entities/Appointments';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindAllinMonthFromProviderDTO from '../dtos/IFindAllInMonthFromProviderDTO';
import IFindAllDayFromProviderDTO from '../dtos/IFindAllinDayFromProviderDTO';

export default interface ITeste{
    create(data: ICreateAppointmentDTO): Promise<Appointment>;
    findByDate(date : Date): Promise<Appointment | undefined>;
    findAllinMonthFromProvider(date: IFindAllinMonthFromProviderDTO): Promise<Appointment[]>
    findAllinDayFromProvider(date: IFindAllDayFromProviderDTO): Promise<Appointment[]>
}