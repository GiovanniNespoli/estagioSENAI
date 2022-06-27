import FakeHashProvider from "@modules/users/providers/HashProvider/fakes/FakeHashProvider";
import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository";
import CreateUserService from "@modules/users/services/CreateUserService";
import ListProviderService from "@modules/appointments/services/ListProviderService";

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let listProviderService: ListProviderService;

describe('ListOnlyProviders', () => {

    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();

        listProviderService = new ListProviderService(
            fakeUsersRepository
        );

        createUser = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider
        );
    });

    it('Should be able to list the providers',async () => {
        
        
        const user1 = await createUser.execute({
            name: 'Giovanni',
            email: 'gio@gmail.com',
            password: '123'
        });

        
        const user2 = await createUser.execute({
            name: 'Gio',
            email: 'giovanni@gmail.com',
            password: '1234'
        });

        const loggerdUser = await createUser.execute({
            name: 'Gigio',
            email: 'gioLogged@gmail.com',
            password: '123'
        });

        const providers = await listProviderService.execute({
            user_id: loggerdUser!.id,
        });

        expect(providers).toEqual([
            user1,
            user2
        ])
        
    });
});