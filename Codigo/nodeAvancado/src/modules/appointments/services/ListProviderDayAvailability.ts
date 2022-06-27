import { type } from "os";
import { injectable, inject } from "tsyringe";

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
    provider_id: string;
    day: number;
    month: number,
    year: number
};

type IResponse = Array<{
    hour: number;
    available: boolean
}>;


@injectable()
export default class ListProviderDayAvailability {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository
    ){}

    public async execute({provider_id, year, month, day}: IRequest): Promise<IResponse>{
        return [{ hour: 8, available: true}];
    }
}