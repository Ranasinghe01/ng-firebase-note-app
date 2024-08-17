import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  Firestore,
  query,
  where,
  Timestamp,
  addDoc,
  doc, getDoc, deleteDoc, updateDoc
} from "@angular/fire/firestore";
import {from, Observable} from "rxjs";

export type Task = {
  _id: string,
  title: string,
  content: string,
  user: string,
  timestamp: Timestamp
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly taskCollectionRef;

  constructor(private FireStore: Firestore) {
    this.taskCollectionRef = collection(FireStore, "note");
  }

  getTask(userEmail: string) {
    const queryGetTaskList =
      query(this.taskCollectionRef, where("user", "==", userEmail));

    return collectionData(queryGetTaskList, {idField: "_id"}) as Observable<Task[]>
  }

  getTaskById(userEmail: string, taskId: string) {
    // Create a reference to the specific task document
    const taskDocRef = doc(this.taskCollectionRef, taskId);

    // Fetch the task document data
    return from(getDoc(taskDocRef).then(docSnapshot => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();

        // Ensure the object has a 'user' property
        if (data && data['user'] === userEmail) {
          return {_id: docSnapshot.id, ...data} as Task;
        }
      }
      return undefined;
    }));
  }

  async createNewTask(title: string, content: string, user: string) {
    const newNote = {
      title,
      content,
      user,
      timestamp: Timestamp.now()
    };
    await addDoc(this.taskCollectionRef, newNote);
  }

  async removeTask(task: Task) {
    const docRef = doc(this.taskCollectionRef, task._id);
    await deleteDoc(docRef);
  }

  async updateTask(taskId: string, title: string, content: string) {
    const docRef = doc(this.taskCollectionRef, taskId);
    await updateDoc(docRef, {
        title,
        content,
        timestamp: Timestamp.now()
    });
  }
}
