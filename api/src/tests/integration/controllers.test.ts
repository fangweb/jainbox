import * as request from 'supertest';
import { Server } from '../../server';
import { Db } from '../../db';
import { QueryFile } from 'pg-promise';
import { IncorrectPasswordMessage, UserNotFoundMessage } from '../../common/const';
import * as Path from 'path';

const application = new Server().getApp();

beforeAll(async done => {
  const qf = new QueryFile(Path.resolve(__dirname, '../../setup/init.sql'), { minify: true });
  try {
    await Db.any(qf);
  } catch (e) {
    console.log(e);
  } finally {
    done();
  }
});

test('not found', done => {
  request(application)
    .get('/notdefined')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(404)
    .end(function(error, response) {
      if (error) return done(error);
      expect(response.body).toEqual({ message: 'Endpoint not found' });
      done();
    });
});

test('user controllers', async (done) => {
  try {
    const username = 'testuserA',
          password = 'testPasswordA12';
    await request(application)
      .post('/user/create')
      .send({ username, password })
      .expect('Authorization', /Bearer/)
      .expect(200);

    await request(application)
      .get('/user/sign-in')
      .send({ username, password })
      .expect('Authorization', /Bearer/)
      .expect(200);

    const signinResponse = await request(application)
      .get('/user/sign-in')
      .send({ username, password: 'wrongPassword' })
      .expect(401);

    expect(signinResponse.body.message).toEqual(IncorrectPasswordMessage);

    await request(application)
      .put('/user/deactivate')
      .send({ username, password })
      .expect(200);

    const deactivateResponse = await request(application)
      .put('/user/deactivate')
      .send({ username, password })
      .expect(401);

    expect(deactivateResponse.body.message).toEqual(UserNotFoundMessage);
    done();
  } catch (error) {
    done(error);
  }
});

test('panel controllers', async (done) => {
  try {
    const username = 'testuserB',
      password = 'passwordB';

    const createResponse = await request(application)
      .post('/user/create')
      .send({ username, password })
      .expect('Authorization', /Bearer/)
      .expect(200);

    let inboxResponse = await request(application)
      .get('/panel/inbox')
      .expect(401);

    inboxResponse = await request(application)
      .get('/panel/inbox')
      .set('Authorization', createResponse.get('Authorization'))
      .send({ page: 1 })
      .expect(200);
    
    done();
  } catch (error) {
    done(error);
  }
});

afterAll(() => {
  Db.$pool.end();
});
