import { Express, Request, Response } from "express";
import { createPostHandler, updatePostHandler, getPostHandler, deletePostHandler, } from "./controller/post.controller";
import { createUserHandler, getUserInfo } from "./controller/user.controller";
import { createUserSessionHandler, invalidateUserSessionHandler, getUserSessionsHandler, } from "./controller/session.controller";
import { validateRequest, requiresUser } from "./middleware";
import { createUserSchema, createUserSessionSchema, } from "./schema/user.schema";
import { createPostSchema, updatePostSchema, deletePostSchema, } from "./schema/post.schema";
import { createProfileSchema, updateProfileSchema, deleteProfileSchema, } from "./schema/profile.schema";
import { createProfileHandler, updateProfileHandler, getProfileHandler, deleteProfileHandler, getUserProfilesHandler, getProfilesbyNameHandler } from "./controller/profile.controller";

export default function (app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  // Register user
  const usersRoute = "/api/users";

  app.post(usersRoute, validateRequest(createUserSchema), createUserHandler);
  app.get(usersRoute + "/info", getUserInfo);
  app.get(usersRoute + "/profiles", [requiresUser], getUserProfilesHandler);

  const sessionsRoute = "/api/sessions";
  // Get the user's sessions
  app.get(sessionsRoute, requiresUser, getUserSessionsHandler);
  // Login
  app.post(sessionsRoute, validateRequest(createUserSessionSchema), createUserSessionHandler);
  // Logout
  app.delete(sessionsRoute, requiresUser, invalidateUserSessionHandler);


  const postsRoute = "/api/posts";
  // Get a post
  app.get(postsRoute + "/:postId", getPostHandler);
  // Create a post
  app.post(postsRoute, [requiresUser, validateRequest(createPostSchema)], createPostHandler);
  // Update a post
  app.put(postsRoute + "/:postId", [requiresUser, validateRequest(updatePostSchema)], updatePostHandler);
  // Delete a post
  app.delete(postsRoute + " /: postId", [requiresUser, validateRequest(deletePostSchema)], deletePostHandler);


  const profileRoute = "/api/profile";
  // Get profile by id
  app.get(profileRoute + "/:profileId", getProfileHandler);
  // Get a profile by name
  app.get(profileRoute + "/name/:profileName", [requiresUser], getProfilesbyNameHandler);
  // Create a profile
  app.post(profileRoute, [requiresUser, validateRequest(createProfileSchema)], createProfileHandler);
  // Update a profile
  app.put(profileRoute + "/:profileId", [requiresUser, validateRequest(updateProfileSchema)], updateProfileHandler);
  // Delete a profile
  app.delete(profileRoute + "/:profileId", [requiresUser, validateRequest(deleteProfileSchema)], deleteProfileHandler);



}
