import { Request, Response } from "express";
import createUser from "../services/createUser";

export function helloWorld(request: Request, response: Response)
{
    const user = createUser({
        email : 'Giovanni@gmail.com',
        passworld : '1234',
        techs : [
            'React',
            'React Native', 
            'Express',
            {
                title : 'JS',
                experience : 10
            }]
    });

    return response.json(user);
};