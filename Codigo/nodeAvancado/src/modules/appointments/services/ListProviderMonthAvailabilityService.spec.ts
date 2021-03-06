import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepositoriy';
import ListProviderMonthAvailability from '@modules/appointments/services/ListProviderMonthAvailabilityService';

let fakeUsersRepository: FakeUsersRepository;
let listProviderMonthAvailability: ListProviderMonthAvailability; 
let fakeAppointmentsRepositoriy: FakeAppointmentsRepository;

describe('MonthAvainable', () => {

    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeAppointmentsRepositoriy = new FakeAppointmentsRepository();
        listProviderMonthAvailability = new ListProviderMonthAvailability(
            fakeAppointmentsRepositoriy,
        );
    });

    it('shouble be able to list the month availability from provider', async () => {
        await fakeAppointmentsRepositoriy.create({
            user_id: '12',
            provider_id: 'user',
            date: new Date(2020, 4, 20, 8, 0, 0),
        });
        await fakeAppointmentsRepositoriy.create({
            user_id: '12',
            provider_id: 'user',
            date: new Date(2020, 4, 20, 9, 0, 0),
        });
        await fakeAppointmentsRepositoriy.create({
            user_id: '12',
            provider_id: 'user',
            date: new Date(2020, 4, 20, 10, 0, 0),
        });
        await fakeAppointmentsRepositoriy.create({
            user_id: '12',
            provider_id: 'user',
            date: new Date(2020, 4, 20, 11, 0, 0),
        });
        await fakeAppointmentsRepositoriy.create({
            user_id: '12',
            provider_id: 'user',
            date: new Date(2020, 4, 20, 12, 0, 0),
        });
        await fakeAppointmentsRepositoriy.create({
            user_id: '12',
            provider_id: 'user',
            date: new Date(2020, 4, 20, 13, 0, 0),
        });
        await fakeAppointmentsRepositoriy.create({
            user_id: '12',
            provider_id: 'user',
            date: new Date(2020, 4, 20, 14, 0, 0),
        });
        await fakeAppointmentsRepositoriy.create({
            user_id: '12',
            provider_id: 'user',
            date: new Date(2020, 4, 20, 15, 0, 0),
        });
        await fakeAppointmentsRepositoriy.create({
            user_id: '12',
            provider_id: 'user',
            date: new Date(2020, 4, 20, 16, 0, 0),
        });
        await fakeAppointmentsRepositoriy.create({
            user_id: '12',
            provider_id: 'user',
            date: new Date(2020, 4, 20, 17, 0, 0),
        });
        
        await fakeAppointmentsRepositoriy.create({
            user_id: '12',
            provider_id: 'user',
            date: new Date(2020, 4, 21, 9, 0, 0),
        });

        const availability = await listProviderMonthAvailability.execute({
            user_id: 'user',
            year: 2020,
            month: 5,
        });

        expect(availability).toEqual(expect.arrayContaining([
            { day: 19, available: true},
            { day: 20, available: false},
            { day: 21, available: true},
            { day: 22, available: true},
        ]));
    });
});