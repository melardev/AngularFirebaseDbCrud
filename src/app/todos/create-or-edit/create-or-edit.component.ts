import {Component, OnInit} from '@angular/core';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {ActivatedRoute, Router} from '@angular/router';

import {ErrorAppResponse} from '../../shared/dtos/responses/base.dto';
import {NotificationService} from '../../shared/services/notification.service';
import {TodoFirebaseService} from '../services/todo-firebase.service';
import {Todo} from '../dtos/responses/todos.dto';

@Component({
  selector: 'app-create-or-edit',
  templateUrl: './create-or-edit.component.html',
  styleUrls: ['./create-or-edit.component.css']
})
export class CreateOrEditComponent implements OnInit {

  todo: Todo;
  private todoForm: FormGroup;
  isSubmitting = false;
  private submitted: boolean;

  constructor(private todoFirebaseService: TodoFirebaseService,
              private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private notificationService: NotificationService) {
    this.todoForm = this.formBuilder.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      completed: [null],
    });
  }

  ngOnInit() {

    const id = this.route.snapshot.params.id;

    if (id) {
      // edit mode
      this.todoFirebaseService.getById(id).snapshotChanges().subscribe(res => {

        this.notificationService.dispatchSuccessMessage('Todo Fetched successfully');
        if (res.payload.exists()) {
          this.todo = res.payload.toJSON() as Todo;
          this.todo.$key = res.key;

          // patchValue vs setValue, setValue is for updating all controls, patchValue for updating only some,
          // leaving the rest untouched
          this.todoForm.patchValue({
            title: this.todo.title,
            description: this.todo.description,
            completed: this.todo.completed
          });
        }
      }, err => {
        this.notificationService.dispatchErrorMessage('Error');
      });
    }
  }

  update(): void {
    this.submitted = true;
    this.todoFirebaseService.update(this.todo)
      .then((res) => {
        this.notificationService.dispatchSuccessMessage('Todo updated successfully');
      }).catch(err => {
      this.notificationService.dispatchErrorMessage('Todo was not updated');
    });
  }

  delete(): void {
    this.submitted = true;
    this.todoFirebaseService.deleteById(this.todo.$key)
      .then((res) => {
        this.router.navigate(['/']);
        this.notificationService.dispatchSuccessMessage('Successfully deleted todo');

      }).catch(err => {
      debugger;
      this.notificationService.dispatchErrorMessage('Todo was not deleted: ' + err);
    });
  }

  create() {
    this.todoFirebaseService.createTodo(this.todo).then(res => {
      this.notificationService.dispatchSuccessMessage('Todo created');
      this.router.navigateByUrl('/');
    }).catch(error => {
      debugger;
      this.notificationService.dispatchErrorMessage(error.toString());
    });

  }

  createOrUpdateTodo() {
    this.isSubmitting = true;
    const newTodo = {} as Todo;

    newTodo.title = this.todoForm.value.title;
    newTodo.description = this.todoForm.value.description;
    // If the user has not touched the checkbox then it will be null
    newTodo.completed = this.todoForm.value.completed || false;

    if (this.todo) {
      newTodo.$key = this.todo.$key;
      newTodo.createdAt = this.todo.createdAt;
      this.todoFirebaseService.update(newTodo).then(res => {
        this.notificationService.dispatchSuccessMessage('Todo updated');
        this.isSubmitting = false;
      }, err => {
        this.isSubmitting = false;
      });
    } else {
      newTodo.completed = newTodo.completed || false;
      this.todoFirebaseService.createTodo(newTodo).then(res => {
        this.isSubmitting = false;
        this.notificationService.dispatchSuccessMessage('Todo created successfully');
        this.router.navigateByUrl('/');
      }).catch(err => {
        debugger;
        this.notificationService.dispatchErrorMessage(err);
      });
    }
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
