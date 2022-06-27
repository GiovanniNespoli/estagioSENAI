import { Request, Response } from 'express';
import { container } from "tsyringe";

import ListProviderService from "@modules/appointments/services/ListProviderService";

export default class ProvidersController {
    public async index(request: Request, response: Response): Promise<Response> {
        console.log(request.user);
        
        const user_id = request.user.id;

        const listProviders = await container.resolve(ListProviderService);

        const providers = await listProviders.execute({
            user_id,
        });

        return response.json(providers)
    }
}