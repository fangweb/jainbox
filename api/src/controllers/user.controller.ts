import { RequestHandler } from "express";
import { BaseController } from "./base.controller";

import { UserService } from "../services";
import {
  IncorrectPasswordError,
  UserNotFoundError,
  UnauthorizedError,
  UserExistsError,
  HttpError,
  DeactivateError
} from "../common/errors";
import {
  EmptyFieldsErrorMessage,
  MaxUsernameLength,
  MaxPasswordLength,
  InvalidLengthMessage
} from "../common/const";
import { isLenLowerThan } from "../common/helpers";

const validation = (request, response, next) => {
  const { username, password } = request.body;

  if (!username || !password) {
    return next(
      new HttpError({ status: 401, message: EmptyFieldsErrorMessage })
    );
  }

  if (
    !isLenLowerThan(username, MaxUsernameLength) ||
    !isLenLowerThan(password, MaxPasswordLength)
  ) {
    return next(new HttpError({ status: 401, message: InvalidLengthMessage }));
  }

  next();
};

export class UserController extends BaseController {
  public constructor() {
    super();

    this.router.use(validation);
    this.router.route("/sign-in").post(this.signIn);
    this.router.route("/create").post(this.create);
    this.router.route("/deactivate").put(this.deactivate);
  }

  public static get router() {
    return new UserController().router;
  }

  private signIn: RequestHandler = async (
    request,
    response,
    next
  ): Promise<any> => {
    const { username, password } = request.body;
    let token;

    try {
      token = await UserService.signIn(username, password);
    } catch (error) {
      if (
        error instanceof IncorrectPasswordError ||
        error instanceof UserNotFoundError
      ) {
        return next(new UnauthorizedError(error.message));
      }
      return next(error);
    }

    response.json({ Authorization: `Bearer ${token}` });
  };

  private create: RequestHandler = async (request, response, next) => {
    const { username, password } = request.body;
    const grpcClient = request.app.get("grpcClient");
    let token;

    try {
      token = await UserService.create(username, password);
    } catch (error) {
      if (error instanceof UserExistsError) {
        return next(new HttpError({ status: 409, message: error.message }));
      }
      return next(error);
    }

    try {
      grpcClient.Broadcast(
        {
          Type: "newUser",
          Notification: username
        },
        function(grpcError, grpcResponse) {
          console.log(grpcResponse);
          if (grpcError) {
            console.error(grpcError);
          }
        }
      );
    } catch (notifyError) {
      console.error(notifyError);
    }

    response.json({ Authorization: `Bearer ${token}` });
  };

  private deactivate: RequestHandler = async (request, response, next) => {
    const { username, password } = request.body;

    try {
      await UserService.deactivate(username, password);
    } catch (error) {
      if (
        error instanceof DeactivateError ||
        error instanceof IncorrectPasswordError ||
        error instanceof UserNotFoundError
      ) {
        return next(new HttpError({ status: 409, message: error.message }));
      }
      return next(error);
    }

    response.json({ Success: "true" });
  };
}
