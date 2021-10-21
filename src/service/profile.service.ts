import {
  DocumentDefinition,
  FilterQuery,
  UpdateQuery,
  QueryOptions,
} from "mongoose";
import Profile, { ProfileDocument } from "../model/profile.model";

export function createProfile(input: DocumentDefinition<ProfileDocument>) {
  return Profile.create(input);
}

export function findProfile(
  query: FilterQuery<ProfileDocument>,
  options: QueryOptions = { lean: true }
) {
  console.log(query);
  return Profile.findOne(query, {}, options);
}

export function findAndUpdate(
  query: FilterQuery<ProfileDocument>,
  update: UpdateQuery<ProfileDocument>,
  options: QueryOptions
) {
  return Profile.findOneAndUpdate(query, update, options);
}

export function deleteProfile(query: FilterQuery<ProfileDocument>) {
  return Profile.deleteOne(query);
}

export function getUserProfiles(
  query: FilterQuery<ProfileDocument>,
  options: QueryOptions = { lean: true, multi: true }
) {
  console.log(query);
  return Profile.find(query, {}, options);
}

export function getProfileByName(
  query: FilterQuery<ProfileDocument>,
  options: QueryOptions = { lean: true }
) {
  console.log(query);
  return Profile.find(query, {}, options);
}


export async function getDashboardDetails(

  query: FilterQuery<ProfileDocument>,
  options: QueryOptions = { lean: true, multi: true }
) {
  console.log(query);
  console.log("profilesTotalViewsCount");
  var user = query["user"];
  var profilesCount = Profile.count(query);
  var profilesTotalViewsCount = await Profile.aggregate([
    { $match: query },
    {
      $group: {
        _id: '$profileName',
        count: { $sum: "$viewcount" }
      }
    }
  ]);
  return { profilesCount, profilesTotalViewsCount }
}
