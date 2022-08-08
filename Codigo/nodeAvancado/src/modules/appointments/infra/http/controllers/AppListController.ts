import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListUserAppointments from '@modules/appointments/services/ListUserAppointments';

class AppListController {
    public async index(request: Request, response: Response): Promise<Response> {
        const user_id = request.user.id;
        const { year, month, day } = request.query;

        console.log(year, month, day, user_id)

        const AppList = container.resolve(
            ListUserAppointments,
        );

        const appointments = await AppList.execute({
            user_id,
            year: Number(year),
            month: Number(month),
            day: Number(day),
        });

        console.log(appointments + "obj controller");

        return response.json(classToClass(appointments));
    }
}

export default AppListController;