import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../services/notifications.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor( public Messages: NotificationsService ) {
  }

  ngOnInit() {
  }

  delete(i: number){
      this.Messages.Messages.splice(i, 1);
  }

}
