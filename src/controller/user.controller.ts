import { Request, Response } from "express";
import { omit, get } from "lodash";
import { createUser, findUser } from "../service/user.service";
import log from "../logger";

export async function createUserHandler(req: Request, res: Response) {
  try {
    const user = await createUser(req.body);
    return res.send(omit(user.toJSON(), "password"));
  } catch (e) {
    log.error(e);
    return res.status(409).send(e.message);
  }
}


export async function getUserInfo(req: Request, res: Response) {
  try {
    console.log(req["user"]);
    const _id = get(req, "user._id");
    const user = await findUser({ _id });
    return res.send(omit(user, "password"));
  } catch (e) {
    log.error(e);
    return res.status(409).send(e.message);
  }
}