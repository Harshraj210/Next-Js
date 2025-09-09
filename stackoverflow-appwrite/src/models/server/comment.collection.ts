import {IndexType, Permission} from "node-appwrite";
import {databases} from "./config"
import { db, commentcollection } from "@/name"; 


export default async function createCommentsCollection() {
  try {
    
    await databases.createCollection(db,commentcollection,"comments",[
      Permission.read("any"),
      Permission.read("users"),
      Permission.create("users"),
      Permission.update("users"),
      Permission.delete("users"),
    ])
    console.log("Answers collection created successfully");
    await Promise.all ([
      
      databases.createStringAttribute(db,commentcollection,"content",10000,true),
      databases.createEnumAttribute(db,commentcollection  ,"type",["answer","question"] ,true),
      databases.createStringAttribute(db,commentcollection,"typeId",50,true),
      databases.createStringAttribute(db,commentcollection,"authorId",50,true),
     
    ])
    console.group("comments Attachments Created")
  } catch (error:any) {
     console.error("Error creating comments collection:", error.message);
  }
}