"use server"
import { DB } from "@/lib/firebase"
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  serverTimestamp,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export const addTodo = async ({ title, description, status,userId }:{ title:string, description:string, status:string,userId:string | undefined }) => {
  try {
    console.log({ title, description, status,userId })
    await addDoc(collection(DB, "todo"), {
      user: userId,
      title: title,
      description: description,
      status: status,
      createdAt: serverTimestamp(),
    });
    return true
  } catch (err) {
    console.log(err);
    return false
  }
};

export const toggleTodoStatus = async ({ docId, status }:{ docId:string, status:string }) => {
  try {
    const todoRef = doc(DB, "todo", docId);
    await updateDoc(todoRef, {
      status,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteTodo = async (docId:string) => {
  try {
    const todoRef = doc(DB, "todo", docId);
    await deleteDoc(todoRef);
  } catch (err) {
    console.log(err);
  }
};

type todo = { id:string, title:string, description:string, status:string,userId:string | undefined }

export const GetToDos = async ({ userId }:{ userId:string}) => {
  try {
    const q = query(collection(DB, "todo"), where("user", "==", userId));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data()
      } as todo
    });
  } catch (err) {
    return null
  }
}
