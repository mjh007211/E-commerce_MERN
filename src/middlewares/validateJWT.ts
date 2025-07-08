import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { userModel } from "../models/userModel";
import { ExtendRequst } from "../types/extendRequst";

export const validateJWT = (
  req: ExtendRequst,
  res: Response,
  next: NextFunction
) => {
  const authorizationHeader = req.get("authorization");

  if (!authorizationHeader) {
    res.status(403).send("authorization header was not provided");
    return;
  }

  const token = authorizationHeader.split(" ")[1];

  if (!token) {
    res.status(403).send("bearer token not found");
    return;
  }

  jwt.verify(
    token,
    "ToxCb8KHc6ASeVAKjVmMCzt7MZnr9UiT",
    async (err, payload) => {
      if (err) {
        res.status(403).send("invaild token");
        return;
      }

      if (!payload) {
        res.status(403).send("invaild token payload");
        return;
      }

      const userPayload = payload as {
        email: string;
        firstName: string;
        lastName: string;
      };

      const user = await userModel.findOne({ email: userPayload.email });

      req.user = user;
      next();
    }
  );
};
