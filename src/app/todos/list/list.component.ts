import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NotificationService} from '../../shared/services/notification.service';
import {TodoFirebaseService} from '../services/todo-firebase.service';
import {Todo} from '../dtos/responses/todos.dto';
import * as faker from 'faker';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  private errors: any;
  todos: Todo[] = [];

  constructor(private todosService: TodoFirebaseService,
              private router: Router,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.todosService.getAll().snapshotChanges().subscribe(res => {
      this.todos.length = 0;
      res.forEach(t => {
        const todo = t.payload.toJSON();
        todo['$key'] = t.key;
        this.todos.push(todo as Todo);
      });
      this.notificationService.dispatchSuccessMessage('Todos fetched successfully');
    }, err => {
      debugger;
      this.notificationService.dispatchErrorMessage(`An error occurred ${err}`);
    });
  }

  edit(id: string) {
    this.todosService.getById(id).snapshotChanges().subscribe(res => {
      if (res.payload.exists()) {
        const returnedTodo = res.payload.toJSON();
        returnedTodo['$key'] = res.key;
        this.todos = this.todos.map(todo => todo.$key === (returnedTodo as Todo).$key ? (returnedTodo as Todo) : todo);
        this.notificationService.dispatchSuccessMessage('Todo updated successfully');
      } else {
        this.notificationService.dispatchSuccessMessage('Unknown error');
      }
      return res;
    });
  }

  toggleComplete(todo: Todo) {
    const newTodo = {...todo, completed: !todo.completed};
    this.todosService.update(newTodo)
      .then(response => {
        // this.notificationService.dispatchSuccessMessage('Todo updated successfully');
        if (this.todos) {
          this.todos = this.todos.map(t => t.$key === todo.$key ? newTodo : t);
        }
      }).catch(err => {
      this.notificationService.dispatchErrorMessage(err.toString());
      debugger;
    });
  }

  deleteAll() {
    this.todosService.deleteAll().then(res => {
      this.todos.length = 0;
      this.notificationService.dispatchSuccessMessage('Todos deleted successfully');
    }).catch(err => {
      this.notificationService.dispatchErrorMessage('Error');
    });
  }

  deleteTodo(todo: Todo) {
    this.todosService.deleteById(todo.$key).then(res => {
      this.todos = this.todos.filter(t => t.$key !== todo.$key);
      this.notificationService.dispatchSuccessMessage('Todo deleted successfully');
    }, err => {
      this.notificationService.dispatchErrorMessage(err);
    });
  }

  seedDatabase() {
    for (let i = 0; i < 5; i++) {
      this.todosService.createTodo({
        title: faker.lorem.words(faker.random.number({min: 2, max: 5})),
        // you can also use faker.lorem.text()
        description: faker.lorem.sentences(faker.random.number({min: 5, max: 10})),
        completed: faker.random.boolean() && faker.random.boolean(), // make it harder to be true
        createdAt: faker.date.between('2015-01-01', new Date().toDateString()).toISOString(),
        updatedAt: faker.date.between('2015-01-01', new Date().toDateString()).toISOString()
      } as Todo);
    }
  }
}
