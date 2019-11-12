import {
  IncorrectPasswordError,
  UpdateOnlineStatusError,
  UserNotFoundError,
  UserExistsError
} from "../common/errors";
import { Server } from "../server";
import { IncorrectPasswordMessage, UserNotFoundMessage } from "../common/const";
import {
  UserRepository,
  MessagesRepository,
  PanelRepository
} from "../repository";
import { UserService, TokenService } from "../services";
import { Db } from "../db";
import { QueryFile } from "pg-promise";
import * as Path from "path";
import * as request from "supertest";

const application = new Server().getApp();

beforeAll(async done => {
  const qf = new QueryFile(Path.resolve(__dirname, "../../init.sql"), {
    minify: true
  });
  try {
    await Db.any(qf);
  } catch (error) {
    console.log(error);
  } finally {
    done();
  }
});

test("Create a new user and correctly handle duplicate users", async () => {
  try {
    const data = await UserRepository.create({
      username: "testname",
      hash: "fakehashstring"
    });
    expect(data.username).toEqual("testname");
  } catch (error) {
    throw error;
  }

  try {
    await UserRepository.create({
      username: "testname",
      hash: "fakehashstring"
    });
    throw new Error("Resolved");
  } catch (error) {
    expect(error).toBeInstanceOf(UserExistsError);
  }
});

test("Get user details directly through the user repository", async () => {
  try {
    const data = await UserRepository.details({ username: "testname" });
    expect({ username: data.username, hash: data.hash }).toEqual({
      username: "testname",
      hash: "fakehashstring"
    });
  } catch (error) {
    throw error;
  }

  try {
    await UserRepository.details({ username: "nonexistant" });
    throw new Error("Resolved");
  } catch (error) {
    expect(error).toBeInstanceOf(UserNotFoundError);
  }
});

test("Deactivate a user directly through the user repository", async () => {
  try {
    const data = await UserRepository.deactivate({
      username: "testname",
      hash: "fakehashstring"
    });
    expect({ username: data.username, deactivated: data.deactivated }).toEqual({
      username: "testname",
      deactivated: true
    });
  } catch (error) {
    throw error;
  }
});

test("Update user online status through the user repository", async () => {
  try {
    const dataCreate = await UserRepository.create({
      username: "testStatusName",
      hash: "hashstring"
    });
    const dataUpdateStatus = await UserRepository.updateStatus({
      usernameId: dataCreate.id,
      onlineStatus: true
    });
    expect({ username_id: dataCreate.id, online_status: true }).toEqual({
      username_id: dataUpdateStatus.username_id,
      online_status: true
    });
  } catch (error) {
    throw error;
  }

  try {
    const data = await UserRepository.updateStatus({
      usernameId: -1,
      onlineStatus: true
    });
    throw new Error("Resolved");
  } catch (error) {
    expect(error).toBeInstanceOf(UpdateOnlineStatusError);
  }
});

test("Create a user and sign in using only the user service", async () => {
  try {
    const createToken = await UserService.create(
      "serviceUser",
      "password2hash"
    );
    const createPayload = await TokenService.verify(createToken);
    expect({ username: createPayload.username }).toEqual({
      username: "serviceUser"
    });
    expect(createPayload.username_id).not.toBeNaN();

    const signInToken = await UserService.signIn(
      "serviceUser",
      "password2hash"
    );
    const signInPayload = await TokenService.verify(signInToken);
    expect({ username: signInPayload.username }).toEqual({
      username: "serviceUser"
    });
    expect(signInPayload.username_id).toEqual(createPayload.username_id);
  } catch (error) {
    throw error;
  }
});

test("Test error handling for user service", async () => {
  try {
    await UserService.signIn("nonExistantUser", "fakepassword2hash");
    throw new Error("Resolved");
  } catch (error) {
    expect(error).toBeInstanceOf(UserNotFoundError);
  }

  try {
    await UserService.signIn("serviceUser", "incorrectPassword");
    throw new Error("Resolved");
  } catch (error) {
    expect(error).toBeInstanceOf(IncorrectPasswordError);
  }
});

test("Directly test messages and panel repository calls", async () => {
  let payloadC, payloadD;

  try {
    const tokenC = await UserService.create("testUserC", "passwordzy");
    const tokenD = await UserService.create("testUserD", "passwordab");
    payloadC = await TokenService.verify(tokenC);
    payloadD = await TokenService.verify(tokenD);
  } catch (error) {
    throw error;
  }

  try {
    const msg1 = await MessagesRepository.compose({
      createdById: payloadC.username_id,
      receiverName: "testUserD",
      messageText: "test message 1"
    });
    expect(msg1).not.toBeNaN();
    const msg2 = await MessagesRepository.compose({
      createdById: payloadC.username_id,
      receiverName: "testUserD",
      messageText: "test message 2"
    });
    const msg3 = await MessagesRepository.compose({
      createdById: payloadC.username_id,
      receiverName: "testUserD",
      messageText: "test message 3"
    });
    const msg4 = await MessagesRepository.compose({
      createdById: payloadD.username_id,
      receiverName: "testUserC",
      messageText: "test message 4"
    });
    const msg5 = await MessagesRepository.compose({
      createdById: payloadD.username_id,
      receiverName: "testUserC",
      messageText: "test message 5"
    });

    let inboxC = await PanelRepository.getInboxMessages({
      usernameId: payloadC.username_id,
      offset: 0,
      limit: 10
    });
    let inboxD = await PanelRepository.getInboxMessages({
      usernameId: payloadD.username_id,
      offset: 0,
      limit: 10
    });
    expect(inboxC.length).toEqual(2);
    expect(inboxD.length).toEqual(3);

    const sentC = await PanelRepository.getSentMessages({
      usernameId: payloadC.username_id,
      offset: 0,
      limit: 10
    });
    const sentD = await PanelRepository.getSentMessages({
      usernameId: payloadD.username_id,
      offset: 0,
      limit: 10
    });
    expect(sentC.length).toEqual(3);
    expect(sentD.length).toEqual(2);

    await PanelRepository.putMessageIntoTrash({
      usernameId: payloadD.username_id,
      messageId: msg1.id
    });
    await PanelRepository.putMessageIntoTrash({
      usernameId: payloadD.username_id,
      messageId: msg2.id
    });
    inboxD = await PanelRepository.getInboxMessages({
      usernameId: payloadD.username_id,
      offset: 0,
      limit: 10
    });
    expect(inboxD.length).toEqual(1);

    await PanelRepository.putMessageIntoTrash({
      usernameId: payloadC.username_id,
      messageId: msg4.id
    });
    inboxC = await PanelRepository.getInboxMessages({
      usernameId: payloadC.username_id,
      offset: 0,
      limit: 10
    });
    expect(inboxC.length).toEqual(1);
  } catch (error) {
    throw error;
  }
});

test("Test 404 handling", done => {
  request(application)
    .get("/notdefined")
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(404)
    .end(function(error, response) {
      if (error) return done(error);
      expect(response.body).toEqual({ message: "Endpoint not found" });
      done();
    });
});

test("Test user endpoint controllers", async done => {
  try {
    const username = "testuserA",
      password = "testPasswordA12";
    await request(application)
      .post("/user/create")
      .send({ username, password })
      .expect(200);

    await request(application)
      .post("/user/sign-in")
      .send({ username, password })
      .expect(200);

    const signinResponse = await request(application)
      .post("/user/sign-in")
      .send({ username, password: "wrongPassword" })
      .expect(401);

    expect(signinResponse.body.message).toEqual(IncorrectPasswordMessage);

    await request(application)
      .put("/user/deactivate")
      .send({ username, password })
      .expect(200);

    const deactivateResponse = await request(application)
      .put("/user/deactivate")
      .send({ username, password })
      .expect(409);

    expect(deactivateResponse.body.message).toEqual(UserNotFoundMessage);
    done();
  } catch (error) {
    done(error);
  }
});

test("Test panel endpoint controllers", async done => {
  try {
    const username = "testuserB",
      password = "passwordB";

    const createResponse = await request(application)
      .post("/user/create")
      .send({ username, password })
      .expect(200);

    let inboxResponse = await request(application)
      .get("/panel/inbox")
      .expect(401);
    
    inboxResponse = await request(application)
      .get("/panel/inbox?page=1")
      .set("Authorization", createResponse.body.Authorization)
      .expect(200);

    done();
  } catch (error) {
    done(error);
  }
});

test("Send and retrieve a message through the user endpoint", async done => {
  try {
    const message_text = "Hello from composeUserA";
    const createdUserA = await request(application)
      .post("/user/create")
      .send({ username: "composeUserA", password: "password" })
      .expect(200);

    const createdUserB = await request(application)
      .post("/user/create")
      .send({ username: "composeUserB", password: "password" })
      .expect(200);

    const composeResponse = await request(application)
      .post("/messages/compose")
      .set("Authorization", createdUserA.body.Authorization)
      .send({ receiver_name: "composeUserB", message_text })
      .expect(200);

    const inboxComposeUserB = await request(application)
      .get("/panel/inbox?page=1")
      .set("Authorization", createdUserB.body.Authorization)
      .expect(200);

    const viewMessage = await request(application)
      .get(`/messages/view?id=${inboxComposeUserB.body[0].message_id}`)
      .set("Authorization", createdUserB.body.Authorization)
      .expect(200);

    expect(viewMessage.body.message_id).toEqual(
      inboxComposeUserB.body[0].message_id
    );
    expect(viewMessage.body.message_text).toEqual(message_text);
    expect(viewMessage.body.username).toEqual("composeUserA");

    done();
  } catch (error) {
    done(error);
  }
});

afterAll(async () => {
  // Create external integration testing users
  /*
  const createdUserA = await request(application)
    .post("/user/create")
    .send({ username: "integServiceUserA", password: "password1" });
    
  const createdUserB = await request(application)
    .post("/user/create")
    .send({ username: "integServiceUserB", password: "password2" });
  */
  // Close db
  Db.$pool.end();
});









