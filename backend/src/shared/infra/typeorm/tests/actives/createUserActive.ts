import FakeRefreshProvider from '@modules/actives/providers/RefreshProvider/fakes/FakeRefreshProvider';
import FakeActivesRepository from '@modules/actives/repositories/fakes/FakeActivesRepository';
import FakeUserActiveRepository from '@modules/actives/repositories/fakes/FakeUserActiveRepository';
import CreateActiveService from '@modules/actives/services/CreateActiveService';

let fakeRefreshProvider: FakeRefreshProvider;
let fakeActivesRepository: FakeActivesRepository;
let fakeUserActiveRepository: FakeUserActiveRepository;
let createActive: CreateActiveService;

export function createActiveRepository(): FakeActivesRepository {
  fakeActivesRepository = new FakeActivesRepository();

  return fakeActivesRepository;
}

export function initCreateUserActive(): FakeUserActiveRepository {
  fakeRefreshProvider = new FakeRefreshProvider();

  fakeUserActiveRepository = new FakeUserActiveRepository(
    fakeActivesRepository,
    fakeRefreshProvider,
  );

  return fakeUserActiveRepository;
}

export function initCreateActiveService(): CreateActiveService {
  createActive = new CreateActiveService(fakeActivesRepository);

  return createActive;
}

export async function createActives(): Promise<void> {
  await createActive.execute('PETR3', 'Acao');
  await createActive.execute('ITUB3', 'Acao');
}
