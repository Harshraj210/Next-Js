import { Client, Account, Avatars } from "appwrite";
import env from "@/app/env";
const client = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject("68be8c130030e24597e2");
const account = new Account(client);
const result = await account.get();
console.log(result);
