import { Request, Response } from "express";
import { get } from "lodash";
import {
  createProfile,
  findProfile,
  findAndUpdate,
  deleteProfile,
} from "../service/profile.service";

export async function createProfileHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  const body = req.body;

  const Profile = await createProfile({ ...body, user: userId });

  return res.send(Profile);
}

export async function updateProfileHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  const ProfileId = get(req, "params.ProfileId");
  const update = req.body;

  const Profile = await findProfile({ ProfileId });

  if (!Profile) {
    return res.sendStatus(404);
  }

  if (String(Profile.user) !== userId) {
    return res.sendStatus(401);
  }

  const updatedProfile = await findAndUpdate({ ProfileId }, update, { new: true });

  return res.send(updatedProfile);
}
export async function getProfileHandler(req: Request, res: Response) {
  const ProfileId = get(req, "params.ProfileId");
  const Profile = await findProfile({ ProfileId });

  if (!Profile) {
    return res.sendStatus(404);
  }

  return res.send(Profile);
}

export async function deleteProfileHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  const ProfileId = get(req, "params.ProfileId");

  const Profile = await findProfile({ ProfileId });

  if (!Profile) {
    return res.sendStatus(404);
  }

  if (String(Profile.user) !== String(userId)) {
    return res.sendStatus(401);
  }

  await deleteProfile({ ProfileId });

  return res.sendStatus(200);
}
