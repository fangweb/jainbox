import {
  IncorrectPasswordError,
  UpdateOnlineStatusError,
  UserNotFoundError,
  UserExistsError
} from '../../common/errors';
import { UserRepository } from '../../repository';
import { UserService, TokenService } from '../../services';
import { Db } from '../../db';
import { QueryFile } from 'pg-promise';
import * as Path from 'path';

beforeAll(async done => {
  const qf = new QueryFile(Path.resolve(__dirname, '../../setup/init.sql'), { minify: true });
  try {
    await Db.any(qf);
  } catch (error) {
    console.log(error);
  } finally {
    done();
  }
});

test('create a user', async () => {
  try {
    const data = await UserRepository.create({ username: 'testname', hash: 'fakehashstring' });
    expect(data.username).toEqual('testname');
  } catch (error) {
    throw error;
  }
});

test('reject an existing user', async () => {
  try {
    const data = await UserRepository.create({ username: 'testname', hash: 'fakehashstring' });
    throw new Error('Resolved');
  } catch (error) {
    expect(error).toBeInstanceOf(UserExistsError);
  }
});

test('get user details', async () => {
  try {
    const data = await UserRepository.details({ username: 'testname' });
    expect({ username: data.username, hash: data.hash }).toEqual({ username: 'testname', hash: 'fakehashstring' });
  } catch (error) {
    throw error;
  }

  try {
    await UserRepository.details({ username: 'nonexistant' });
    throw new Error('Resolved');
  } catch (error) {
    expect(error).toBeInstanceOf(UserNotFoundError);
  }
});

test('deactivate a user', async () => {
  try {
    const data = await UserRepository.deactivate({ username: 'testname', hash: 'fakehashstring' });
    expect({ username: data.username, deactivated: data.deactivated }).toEqual({
      username: 'testname',
      deactivated: true
    });
  } catch (error) {
    throw error;
  }
});

test('update user online status', async () => {
  try {
    const dataCreate = await UserRepository.create({ username: 'testStatusName', hash: 'hashstring' });
    const dataUpdateStatus = await UserRepository.updateStatus({ usernameId: dataCreate.id, onlineStatus: true });
    expect({ username_id: dataCreate.id, online_status: true }).toEqual({
      username_id: dataUpdateStatus.username_id,
      online_status: true
    });
  } catch (error) {
    throw error;
  }

  try {
    const data = await UserRepository.updateStatus({ usernameId: -1, onlineStatus: true });
    throw new Error('Resolved');
  } catch (error) {
    expect(error).toBeInstanceOf(UpdateOnlineStatusError);
  }
});

test('create a user and sign in using user service', async () => {
  try {
    const createToken = await UserService.create('serviceUser', 'password2hash');
    const createPayload = await TokenService.verify(createToken);
    expect({ username: createPayload.username }).toEqual({ username: 'serviceUser' });
    expect(createPayload.username_id).not.toBeNaN();

    const signInToken = await UserService.signIn('serviceUser', 'password2hash');
    const signInPayload = await TokenService.verify(signInToken);
    expect({ username: signInPayload.username }).toEqual({ username: 'serviceUser' });
    expect(signInPayload.username_id).toEqual(createPayload.username_id);
  } catch (error) {
    throw error;
  }
});

test('test errors for user service', async () => {
  try {
    await UserService.signIn('nonExistantUser', 'fakepassword2hash');
    throw new Error('Resolved');
  } catch (error) {
    expect(error).toBeInstanceOf(UserNotFoundError);
  }

  try {
    await UserService.signIn('serviceUser', 'incorrectPassword');
    throw new Error('Resolved');
  } catch (error) {
    expect(error).toBeInstanceOf(IncorrectPasswordError);
  }
});

afterAll(() => {
  Db.$pool.end();
});
