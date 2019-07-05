import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {NotificationService} from '../../shared/services/notification.service';
import {TodoFirebaseService} from '../services/todo-firebase.service';
import {Todo} from '../dtos/responses/todos.dto';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  todo: Todo;

  constructor(private todoApiService: TodoFirebaseService,
              private notificationService: NotificationService,
              private route: ActivatedRoute,
              private router: Router) {

  }

  ngOnInit() {

    // this.route.snapshot.paramMap.get('id');
    // this.route.snapshot.params.id
    this.route.params.subscribe(params => {
      const id = params.id;

      if (id) {
        this.todoApiService.getById(id).snapshotChanges()
          .subscribe(res => {
            if ((res.payload.exists())) {
              this.notificationService.dispatchSuccessMessage('Todo fetched successfully');
              this.todo = res.payload.toJSON() as Todo;
              this.todo.$key = res.key;
            } else {
              this.notificationService.dispatchErrorMessage('Todo does not exist');
              this.router.navigate(['/']);
            }
          }, err => {
            this.notificationService.dispatchErrorMessage(err.toString());
            debugger;
          });
      }
    });
  }


}
