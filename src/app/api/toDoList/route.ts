import { DB } from "@/lib/firebase"
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

export const addTodo = async ({ title, description, status,userId }:{ title:string, description:string, status:string,userId:string | undefined }) => {
  try {
    await addDoc(collection(DB, "todo"), {
      user: userId,
      title: title,
      description: description,
      status: status,
      createdAt: new Date().getTime(),
    });
  } catch (err) {}
};

const toggleTodoStatus = async ({ docId, status }:{ docId:string, status:string }) => {
  try {
    const todoRef = doc(DB, "todo", docId);
    await updateDoc(todoRef, {
      status,
    });
  } catch (err) {
    console.log(err);
  }
};

const deleteTodo = async (docId:string) => {
  try {
    const todoRef = doc(DB, "todo", docId);
    await deleteDoc(todoRef);
  } catch (err) {
    console.log(err);
  }
};
