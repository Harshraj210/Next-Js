import env from "@/app/env";
import {
  Databases,
  Storage,
  Account,
  Avatars,
  Users,
  Client,
} from "node-appwrite";

export const client = new Client();
client
// SDK --> Software Development Kit  basically a ready-made library of functions that let you talk to Appwrite (so you don’t have to manually send HTTP requests).
  .setEndpoint(env.endpoint)
  // Tells SDK where your Appwrite server lives
  .setProject(env.projectId)
  .setKey(env.apikey);

export const avatars = new Avatars(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const users = new Users(client);


