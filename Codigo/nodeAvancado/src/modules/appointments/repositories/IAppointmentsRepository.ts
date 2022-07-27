import Appointment from '../infra/typeorm/entities/Appointments';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindAllinMonthFromProviderDTO from '../dtos/IFindAllInMonthFromProviderDTO';
import IFindAllDayFromProviderDTO from '../dtos/IFindAllinDayFromProviderDTO';

export default interface ITeste{
    create(data: ICreateAppointmentDTO): Promise<Appointment>;
    findByDate(data : Date): Promise<Appointment | undefined>;
    findAllinMonthFromProvider(data: IFindAllinMonthFromProviderDTO): Promise<Appointment[]>
    findAllinDayFromProvider(data: IFindAllDayFromProviderDTO): Promise<Appointment[]>
}