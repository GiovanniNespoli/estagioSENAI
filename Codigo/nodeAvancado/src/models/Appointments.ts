import { uuid } from "uuidv4";

// interface AppointmentInterface
// {
//     provider : string,
//     date : Date;
// }

export default class Appointment{
    id: string;

    provider: string;

    date: Date;

    //<> => parametros de tipagem
    constructor({provider, date} : Omit<Appointment, 'id'>)
    {
        this.id         = uuid();
        this.provider   = provider;
        this.date       = date
    }
}
