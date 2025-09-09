import { db } from "@/name";
import createAnswerCollection from "./answer.collection";
import createCommentsCollection from "./comment.collection";
import createQuestionCollection from "./question.collection";
import createVotesCollection from "./vote.collection";
import {databases} from "./config"

export default async function createOrGetDB(){
  try {
    await databases.get(db)
    console.log("DAtabase connected")
  } catch (error) {
    try {
      await databases.create(db,db)
      console.log("Database Created")
      await Promise.all([
        createAnswerCollection(),
        createQuestionCollection(),
        createCommentsCollection()  ,
        createVotesCollection()
      ])
      console.log("Collections created")
      console.log("Database Connected")
    } catch (error) {
      console.log("Error in creating database or collection",error)
    }
  }
  return databases
}


