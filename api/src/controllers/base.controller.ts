import { Router } from "express";

export abstract class BaseController {
  public router: Router;

  public constructor() {
    this.router = Router();
  }
}
