import { DocumentDefinition, FilterQuery } from "mongoose";
import { omit } from "lodash";
import User, { UserDocument } from "../model/user.model";
import { Constants } from "../utils/constants.utils";

export async function createUser(input: DocumentDefinition<UserDocument>) {
  try {
    input.isEmailVerified = false;
    input.isPhoneVerified = false;
    input.subscription = Constants.Subscription_Basic;
    return await User.create(input);
  } catch (error) {
    throw new Error(error);
  }
}

export async function findUser(query: FilterQuery<UserDocument>) {
  return User.findOne(query).lean();
}

export async function validatePassword({
  email,
  password,
}: {
  email: UserDocument["email"];
  password: string;
}) {
  const user = await User.findOne({ email });

  if (!user) {
    return false;
  }

  const isValid = await user.comparePassword(password);

  if (!isValid) {
    return false;
  }

  return omit(user.toJSON(), "password");
}
