import { injectable, inject } from 'tsyringe';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointments';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
    
  ) { }

  public async execute({ provider_id, day, month, year }: IRequest): Promise<Appointment[]> {

    const appointments = await this.appointmentsRepository.findAllinDayFromProvider(
      {
        provider_id,
        day,
        month,
        year,
      },
    );
    console.log(appointments);

    return appointments;
  }
}

export default ListProviderMonthAvailabilityService;