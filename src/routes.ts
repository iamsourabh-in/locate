import { Express, Request, Response } from "express";
import { Get, Route } from "tsoa";

import {
  createPostHandler,
  updatePostHandler,
  getPostHandler,
  deletePostHandler,
} from "./controller/post.controller";
import { createUserHandler,getUserInfo } from "./controller/user.controller";
import {
  createUserSessionHandler,
  invalidateUserSessionHandler,
  getUserSessionsHandler,
} from "./controller/session.controller";
import { validateRequest, requiresUser } from "./middleware";
import {
  createUserSchema,
  createUserSessionSchema,
} from "./schema/user.schema";
import {
  createPostSchema,
  updatePostSchema,
  deletePostSchema,
} from "./schema/post.schema";

import {
  createProfileSchema,
  updateProfileSchema,
  deleteProfileSchema,
} from "./schema/profile.schema";

import {
  createProfileHandler,
  updateProfileHandler,
  getProfileHandler,
  deleteProfileHandler,
  getUserProfilesHandler
} from "./controller/profile.controller";

export default function (app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  // Register user
  app.post("/api/users", validateRequest(createUserSchema), createUserHandler);
  app.get("/api/users/info", getUserInfo);

  


  // Login
  app.post(
    "/api/sessions",
    validateRequest(createUserSessionSchema),
    createUserSessionHandler
  );

  // Get the user's sessions
  app.get("/api/sessions", requiresUser, getUserSessionsHandler);

  // Logout
  app.delete("/api/sessions", requiresUser, invalidateUserSessionHandler);



  // Create a post
  app.post(
    "/api/posts",
    [requiresUser, validateRequest(createPostSchema)],
    createPostHandler
  );
  // Update a post
  app.put(
    "/api/posts/:postId",
    [requiresUser, validateRequest(updatePostSchema)],
    updatePostHandler
  );
  // Get a post
  app.get("/api/posts/:postId", getPostHandler);
  // Delete a post
  app.delete(
    "/api/posts/:postId",
    [requiresUser, validateRequest(deletePostSchema)],
    deletePostHandler
  );



  // Create a post
  app.post(
    "/api/profile",
    [requiresUser, validateRequest(createProfileSchema)],
    createProfileHandler
  );
  // Update a post
  app.put(
    "/api/profile/:profileId",
    [requiresUser, validateRequest(updateProfileSchema)],
    updateProfileHandler
  );
  // Get a post
  app.get("/api/profile/:profileId", getProfileHandler);
  // Delete a post
  app.delete(
    "/api/profile/:profileId",
    [requiresUser, validateRequest(deleteProfileSchema)],
    deleteProfileHandler
  );

  app.get(
    "/api/user/profiles",
    [requiresUser],
    getUserProfilesHandler
  );
}
