import { Request } from "express";

export interface ExtendRequst extends Request {
  user?: any;
}
