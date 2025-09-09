import env from "@/app/env";
import {
  Databases,
  Storage,
  Account,
  Avatars,
  Users,
  Client,
} from "node-appwrite";

const client = new Client();
client
// SDK --> Software Development Kit  basically a ready-made library of functions that let you talk to Appwrite (so you don’t have to manually send HTTP requests).
  .setEndpoint(env.endpoint)
  // Tells SDK where your Appwrite server lives
  .setProject(env.projectId)
  .setKey(env.apikey);

const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);
const users = new Users(client);

export default { Client, users, Avatars, Databases, Storage };
