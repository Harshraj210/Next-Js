import {IndexType, Permission} from "node-appwrite";
import {databases} from "./config"
import { db, votecollection } from "@/name"; 


export default async function createVotesCollection() {
  try {
    
    await databases.createCollection(db,votecollection,"comments",[
      Permission.read("any"),
      Permission.read("users"),
      Permission.create("users"),
      Permission.update("users"),
      Permission.delete("users"),
    ])
    console.log("Votes collection created successfully");
    await Promise.all ([
      
      databases.createStringAttribute(db,votecollection,"content",10000,true),
      databases.createEnumAttribute(db,votecollection  ,"type",["question","answer"] ,true),
      databases.createStringAttribute(db,votecollection,"typeId",50,true),
      databases.createEnumAttribute(db,votecollection,"votestatus",["upvoted","downvoted"],true),
       databases.createStringAttribute(db,votecollection,"voteId",50,true),
     
    ])
    console.group("Votes Attachments Created")
  } catch (error:any) {
     console.error("Error creating comments collection:", error.message);
  }
}