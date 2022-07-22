import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService'

export default class ProviderDayAvailabilityController {
    public async index(request: Request, response: Response): Promise<Response> {

        const { provider_id }= request.params;
        const { year, month, day } = request.query;

        const listProviderDayAvailabilityService = container.resolve(ListProviderDayAvailabilityService);

        const providers = await listProviderDayAvailabilityService.execute({
            provider_id,
            year: year as unknown as number,
            month: month as unknown as number,
            day: day as unknown as number,
        });

        return response.json(providers);
    }
}