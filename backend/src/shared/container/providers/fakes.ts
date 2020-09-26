import { container } from 'tsyringe';

import FakeCacheProvider from './CacheProvider/fakes/FakeCacheProvider';
import ICacheProvider from './CacheProvider/models/ICacheProvider';
import FakeMailProvider from './MailProvider/fakes/FakeMailProvider';
import IMailProvider from './MailProvider/models/IMailProvider';
import FakeMailTemplateProvider from './MailTemplateProvider/fakes/FakeMailTemplateProvider';
import IMailTemplateProvider from './MailTemplateProvider/models/IMailTemplateProvider';
import FakeStorageProvider from './StorageProvider/fakes/FakeStorageProvider';
import IStorageProvider from './StorageProvider/models/IStorageProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  FakeStorageProvider,
);

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  FakeMailTemplateProvider,
);

// container.registerInstance<IMailProvider>('MailProvider', FakeMailProvider);

container.registerSingleton<ICacheProvider>('CacheProvider', FakeCacheProvider);
