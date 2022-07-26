import { container } from 'tsyringe';

import IStorageProvider from "./StorageProvider/models/IStorageProvider";
import DiskStorageProvider from "./StorageProvider/implementations/DiskStorageProvider";

import IMailProvider from './MailProvider/models/IMailProvider';
import ETherealMailProvider from './MailProvider/implementations/ETherealMailProvider';

import IMailTemplateProvider from './MailTemplateProvider/models/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from './MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';

import ICacheProvider from './CacheProvider/models/ICacheProvider';
import CacheProvider from './CacheProvider/implementations/RedisCacheProvider'


container.registerSingleton<IStorageProvider>(
    'StorageProvider',
    DiskStorageProvider
);


container.registerSingleton<IMailTemplateProvider>(
    'MailTemplateProvider',
    HandlebarsMailTemplateProvider
);

container.registerInstance<IMailProvider>(
    'MailProvider', 
    container.resolve(ETherealMailProvider),
);

container.registerInstance<ICacheProvider>(
    'CacheProvider',
    container.resolve(CacheProvider)
);