import Appointment from "../models/Appointments";
import { isEqual } from "date-fns";

export default class AppointmentsRepository {
    /**variavel privada passando o array */
    private appointments : Appointment[];

    /**metedo construtor para termos acesso a variavel */
    constructor(){
        this.appointments = [];
    }

    /**metodo de criacao 
     * : -> é o retorno do nosso metodo
     */
    public create(provider : string, date : Date) : Appointment
    {
        const appoit = new Appointment(provider,date);

        this.appointments.push(appoit);

        return appoit;
    }
    /**metodo de achar o id dentro do ID */
    public findByDate(date : Date) : Appointment | null
    {
                                                            /**1º o parametro
                                                             * ou seja o dado
                                                             * que iremos
                                                             * comparar
                                                             */
        const findDate = this.appointments.find(x => isEqual(date, x.date));

        return findDate || null;
    }
};
