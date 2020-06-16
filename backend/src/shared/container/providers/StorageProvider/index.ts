import { container } from 'tsyringe';

import DiskStorageProvider from './implementations/DiskStorageProvider';
import IStorageProvider from './models/IStorageProvider';

import UploadConfig from '@config/upload';

const providers = {
  disk: DiskStorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers[UploadConfig.driver],
);
