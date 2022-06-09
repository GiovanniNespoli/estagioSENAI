import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';
import UpdateAvatarService from '../services/UpdateUserAvatarServices';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);



usersRouter.post('/', async (request, response) => 
{
    try {
        const { name, email, password } = request.body;
        
        const createUser = new CreateUserService();

        const user = await createUser.execute({
            name,
            email,
            password
        });

          return response.json({
            name,
            email
        });

    } catch (err) {
        return response.status(400).json('This appointment is already booked');
    }
});

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request,response) => 
{
    try {
        const updateUserAvatar = new UpdateAvatarService();

        // updateUserAvatar.execute({
        //     id : request.user.id,
        //     // avatarFileName : request.file.filename,
        // })
    } catch (error) {
        return response.status(400).json(error);
    }
})
  
export default usersRouter;