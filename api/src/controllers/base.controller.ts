import { Router } from 'express';

export abstract class BaseController {
  public router: Router;

  public constructor() {
    this.router = Router();
  }

  /*
  private setupPublishing()

  private publishUpdate: fn<void> = (fn) => {
    await fn
    // publish repository
  }
  */
}
