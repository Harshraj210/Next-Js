import {IndexType, Permission} from "node-appwrite";
import {databases} from "./config"
import { db, answercollection } from "@/name"; 


export default async function createAnswerCollection() {
  try {
    
    await databases.createCollection(db,answercollection,"answers",[
      Permission.read("any"),
      Permission.read("users"),
      Permission.create("users"),
      Permission.update("users"),
      Permission.delete("users"),
    ])
    console.log("Answers collection created successfully");
    await Promise.all ([
      
      databases.createStringAttribute(db,answercollection,"content",10000,true),
      databases.createStringAttribute(db,answercollection,"authorId",50,true),
      databases.createStringAttribute(db,answercollection,"questiontId",50,true),
     
    ])
    console.group("Answer Attachments Created")
  } catch (error:any) {
     console.error("Error creating answers collection:", error.message);
  }
}