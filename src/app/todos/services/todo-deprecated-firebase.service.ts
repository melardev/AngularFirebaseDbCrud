import {Todo} from '../dtos/responses/todos.dto';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from '@angular/fire/database-deprecated';
import {Injectable} from '@angular/core';
import {formatDate} from '@angular/common';
import {ThenableReference} from '@angular/fire/database-deprecated/interfaces';


@Injectable({
  providedIn: 'root'
})
export class TodoApiService {

  todos: FirebaseListObservable<Todo[]>;
  todoDetails: FirebaseObjectObservable<Todo>;

  constructor(private angularFireDatabase: AngularFireDatabase) {
  }

  getAll(): FirebaseListObservable<Todo[]> {
    this.todos = this.angularFireDatabase.list('/todos') as FirebaseListObservable<Todo[]>;
    return this.todos;
  }

  getCompleted(): FirebaseListObservable<Todo[]> {
    return null;
  }

  getPending(): FirebaseListObservable<Todo[]> {
    return null;
  }

  getById(key: string): FirebaseObjectObservable<Todo> {
    this.todoDetails = this.angularFireDatabase.object('/todos/' + key) as FirebaseObjectObservable<Todo>;
    return this.todoDetails;
  }

  createTodo(todo: Todo): ThenableReference {
    const now = formatDate(new Date(), 'HH:mm:ss dd/MM/yyyy', 'en-us');
    const todoObj = {
      title: todo.title,
      description: todo.description,
      completed: todo.completed,
      createdAt: now,
      updatedAt: now
    };
    if (this.todos == null) {
      return this.angularFireDatabase.database.ref('/todos').push(todoObj);
    } else {
      return this.todos.push(todoObj);
    }
  }

  update(todo: Todo): Promise<void> {
    const now = formatDate(new Date(), 'HH:mm:ss dd/MM/yyyy', 'en-US');
    const todoObj = {
      title: todo.title,
      description: todo.description,
      completed: todo.completed,
      createdAt: todo.createdAt,
      updatedAt: now
    };
    if (this.todos == null) {
      return this.angularFireDatabase.database.ref('/todos/' + todo.$key).update(todoObj);
    } else {
      return this.todos.update(todo.$key, todoObj);
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
