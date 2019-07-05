import {Component, OnInit} from '@angular/core';
import {NotificationService} from '../../services/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private message: string;
  private className: string;

  constructor(private notificationService: NotificationService) {

  }

  ngOnInit() {
    this.notificationService.getNotifications().subscribe(notification => {
      if (notification == null) {
        return;
      }
      
      this.className = notification.type === 'success' ? 'alert alert-success' : 'alert alert-danger';
      this.message = notification.message;
      setTimeout(() => {
        this.className = '';
        this.message = '';
      }, 1000);
    });
  }

}
