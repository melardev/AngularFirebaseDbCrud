import {Injectable} from '@angular/core';
import {Todo} from '../dtos/responses/todos.dto';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';
import {formatDate} from '@angular/common';
import {database} from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class TodoFirebaseService {

  todos: AngularFireList<Todo>;
  todoDetails: AngularFireObject<Todo>;

  constructor(private angularFireDatabase: AngularFireDatabase) {
  }

  getAll(): AngularFireList<Todo> {
    this.todos = this.angularFireDatabase.list('/todos') as AngularFireList<Todo>;
    return this.todos;
  }

  getCompleted(): AngularFireList<Todo[]> {
   return null;
  }

  getPending(): AngularFireList<Todo[]> {
    return null;
  }

  getById(key: string): AngularFireObject<Todo> {
    this.todoDetails = this.angularFireDatabase.object('/todos/' + key) as AngularFireObject<Todo>;
    return this.todoDetails;
  }

  createTodo(todo: Todo): database.ThenableReference {
    const now = formatDate(new Date(), 'HH:mm:ss dd/MM/yyyy', 'en-US');
    const todoObj = {
      title: todo.title,
      description: todo.description,
      completed: todo.completed,
      createdAt: todo.createdAt != null ? todo.createdAt : now,
      updatedAt: todo.updatedAt != null ? todo.updatedAt : now
    };

    if (this.todos == null) {
      return this.angularFireDatabase.database.ref('/todos').push(todoObj);
    } else {
      return this.todos.push(todoObj);
    }
  }

  update(todo: Todo): Promise<void> {
    const now = formatDate(new Date(), 'HH:mm:ss dd/MM/yyyy', 'en-US');
    if (this.todos == null) {
      const reference = this.angularFireDatabase.database.ref('/todos/' + todo.$key);
      delete todo.$key; // You should delete this otherwise the update call will fail
      return reference.update({
        ...todo,
        updatedAt: now
      });
    } else {
      return this.todos.update(todo.$key, {
        title: todo.title,
        description: todo.description,
        completed: todo.completed,
        createdAt: todo.createdAt,
        updatedAt: now
      });
    }
  }

  deleteById(key: string): Promise<void> {
    if (this.todos == null) {
      return this.angularFireDatabase.database.ref('/todos/' + key).remove();
    } else {
      return this.todos.remove(key);
    }
  }

  deleteAll(): Promise<void> {
    if (this.todos == null) {
      return this.angularFireDatabase.database.ref('/todos').remove();
    } else {
      return this.todos.remove();
    }
  }
}
