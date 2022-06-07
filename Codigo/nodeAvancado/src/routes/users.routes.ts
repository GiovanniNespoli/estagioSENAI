import { Router } from 'express';

const usersRouter = Router();


usersRouter.post('/', async (request, response) => 
{
    try {
        const { name, email, password } = request.body;
        

    } catch (err) {
        return response.status(400).json('This appointment is already booked');
    }
});

export default usersRouter;