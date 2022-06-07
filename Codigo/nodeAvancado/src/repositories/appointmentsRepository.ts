import {EntityRepository, Repository} from 'typeorm'

import Appointment from "../models/Appointments";

@EntityRepository(Appointment)
export default class AppointmentsRepository extends Repository<Appointment> {

    /**
     * Toda vez em que criamos uma função async await
     * o retorno vira uma promise => Promise<Appointments | null>
     * .then(response => )
     */
    public async findByDate(date : Date) : Promise<Appointment | null>
    {
        const findDate = await this.findOne({
            where : { date },
        });

        return findDate || null;
    }


};
