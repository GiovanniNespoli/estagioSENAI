import { uuid } from "uuidv4";

export default class Appointment{
    id: string;

    provider: string;

    date: Date;

    constructor(prov: string, dt: Date)
    {
        this.id         = uuid();
        this.provider   = prov;
        this.date       = dt
    }
}
