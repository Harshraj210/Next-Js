import { Permission } from "node-appwrite";
import { questionAttactchment } from "@/name";
import { storage } from "./config";
export default async function createOrGetStorage(){
  try {
    await storage.getBucket(questionAttactchment)
    console.log("Stoage connected")
  } catch (error) {
    try {
      await storage.createBucket(
        questionAttactchment,
        questionAttactchment, [
        Permission.read("any"),
      Permission.read("users"),
      Permission.create("users"),
      Permission.update("users"),
      Permission.delete("users"),
      ],
      false,
      undefined,
      undefined,

      ["jpg","png","gif","jpeg","webp","heic"]
      )
      console.log("Storage created")
      console.log("Storage connected");
      
    } catch (error) {
      console.error("Error in creating Storage",error)
    }
    
  }
}