import { Client, Account, Avatars, Databases, Storage } from "appwrite";

import env from "@/app/env";
const client = new Client().setEndpoint(env.endpoint).setProject(env.projectId);
const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);
const result = await account.get();


export default { Client, Account, Avatars, Databases, Storage }