import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomAuthService } from '../services/custom.auth.service';
import { HttpService } from '../services/http.service';
import { NotificationsService } from '../services/notifications.service';
import { MessagesComponent } from '../messages/messages.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  private authToken: any;
  constructor(private router: Router, 
              private authService: CustomAuthService, 
              private httpClient: HttpService,
              private _Messages: NotificationsService,
              private notificationsService: NotificationsService,
              private messages: MessagesComponent
            ) { }

  ngOnInit() {
    if(!this.authService.getAuth()){
      this.router.navigate(['login']);
    }
    
  }

  logout(): any {
    const reqObj = {
      body: { email: this.authService.getUser() },
      uri: '/logout',
    };
    this._Messages.Messages.push({ Text: this.authService.getUser() +' is now logged out from the application' , Type: 'success'})
    this.httpClient.post(reqObj)
      .subscribe(data => {
        if (data.status) {
          this.authService.removeAuth();
          this.authService.removeUser();
          this.checkAuth();
          this.router.navigate(['login']);
        }
      }, err => console.log(err));

  }
  checkAuth() {
    if (this.authService.getAuth()) {
      return true;
    } else {
      return false;
    }
  }

  checkUser(){
    return this.authService.getUser();
  }

  checkNotifications(){
    return this.messages.myLength();
  }
}
