import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListUserAppointments from '@modules/appointments/services/ListUserAppointments';

class AppListController {
    public async index(request: Request, response: Response): Promise<Response> {
        const { id: user_id } = request.user;

        const AppList = container.resolve( 
            ListUserAppointments,
        );

        const appointments = await AppList.execute({
            user_id,
        });

        return response.json(classToClass(appointments));
    }
}

export default AppListController;