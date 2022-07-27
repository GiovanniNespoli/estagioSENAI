import { container } from 'tsyringe'

import  '@modules/users/providers';
import  './providers';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/appointmentsRepository';

import IUserRepository from '@modules/users/repositories/IUsersRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';

import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';
import UserTokenRepository from '@modules/users/infra/typeorm/repositories/UserTokenRepository';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import CacheProvider from '@shared/container/providers/CacheProvider/implementations/RedisCacheProvider';

container.registerSingleton<IUserRepository>('UsersRepository',UserRepository);
container.registerSingleton<IAppointmentsRepository>('AppointmentsRepository',AppointmentsRepository);
container.registerSingleton<IUserTokenRepository>('UserTokenRepository',UserTokenRepository);
container.registerSingleton<ICacheProvider>('CacheProvider', CacheProvider);

