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

  
  