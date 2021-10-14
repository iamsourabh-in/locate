import { object, string } from "yup";

const payload = {
  body: object({
    name: string().required("Title is required")
  }),
};

const params = {
  params: object({
    profileId: string().required("profileId is required"),
  }),
};

export const createProfileSchema = object({
  ...payload,
});

export const updateProfileSchema = object({
  ...params,
  ...payload,
});

export const deleteProfileSchema = object({
  ...params,
});
