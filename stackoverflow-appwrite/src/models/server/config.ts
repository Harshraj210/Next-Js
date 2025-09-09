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
client.setEndpoint(env.endpoint).setProject(env.projectId).setKey(env.apikey);

const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);
const users = new Users(client);

export default { Client, users, Avatars, Databases, Storage };
