import Appointment from "../models/Appointments";
import { isEqual } from "date-fns";

//Data transfer Object

interface createAppointmentsDTO
{
    provider    : string,
    date        : Date;
}

export default class AppointmentsRepository {
    /**variavel privada passando o array */
    private appointments : Appointment[];

    /**metedo construtor para termos acesso a variavel */
    constructor(){
        this.appointments = [];
    }

    /**
     * metodo de listagem
     */
    public listAll() : Appointment[]
    {
        return this.appointments;
    }

    /**metodo de criacao 
     * : -> é o retorno do nosso metodo
     * 
     * {} -> conceito de DTO, desestruturamos para ter o acesso a interface,
     * uma estrutura de parametros nomeados
     */
    public create({provider, date} : createAppointmentsDTO) : Appointment
    {
        const appoit = new Appointment({provider, date});

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
        const findDate = this.appointments.find(x => 
        isEqual(date, x.date));

        return findDate || null;
    }


};
