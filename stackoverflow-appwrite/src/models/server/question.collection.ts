import {IndexType, Permission} from "node-appwrite";
import {databases} from "./config"
import { db, questioncollection } from "@/name"; 


export default async function createQuestionCollection() {
  try {
    
    await databases.createCollection(db,questioncollection,"questions",[
      Permission.read("any"),
      Permission.read("users"),
      Permission.create("users"),
      Permission.update("users"),
      Permission.delete("users"),
    ])
    console.log("Question collection created successfully");
    await Promise.all ([
      databases.createStringAttribute(db,questioncollection,"title",100,true),
      databases.createStringAttribute(db,questioncollection,"content",10000,true),
      databases.createStringAttribute(db,questioncollection,"authorId",50,true),
      databases.createStringAttribute(db,questioncollection,"attachmentId",50,false),
      databases.createStringAttribute(db,questioncollection,"tags",50,true,undefined,true),
    ])
    console.group("Question Attachments Created")
  } catch (error:any) {
     console.error("Error creating questions collection:", error.message);
  }

  // creataing indexs

  // await Promise.all([
  //   databases.createIndex(
  //     db,
  //     questioncollection,
  //     "title",
  //     IndexType.Fulltext,
  //     ["title"],
  //     ["asc"]
  //   ),
  //    databases.createIndex(
  //     db,
  //     questioncollection,
  //     "content",
  //     IndexType.Fulltext,
  //     ["content"],
  //     ["asc"]
  //   )

  // ])
}
