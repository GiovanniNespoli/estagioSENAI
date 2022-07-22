import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService'

export default class ProviderMonthAvailabilityController {
    public async index(request: Request, response: Response): Promise<Response> {

        const { user_id } = request.params

        const { year, month } = request.query;

        const listProviderMonthAvailabilityService = container.resolve(ListProviderMonthAvailabilityService);

        const providers = await listProviderMonthAvailabilityService.execute({
            user_id,
            year: year as unknown as number,
            month: month as unknown as number,
        });

        return response.json(providers);
    }
}