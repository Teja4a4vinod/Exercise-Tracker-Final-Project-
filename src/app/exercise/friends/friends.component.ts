import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Router } from '@angular/router';
import { CustomAuthService } from '../../services/custom.auth.service';
import { NotificationsService } from '../../services/notifications.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  private friends: any;
  private activities: any;
  private click: boolean;
  private showHide: any;

  constructor(private httpClient: HttpService, 
              private router: Router, 
              private authService: CustomAuthService,
              private _Messages: NotificationsService) { }

  ngOnInit() {

    if (this.authService.getAuth()) {
      const reqObj = {
        uri: '/friends',
      };
      this.httpClient.get(reqObj)
        .subscribe(friends => {
          for (let i = 0; i < friends.length; i++) {
            friends[i].isOpen = false;
          }
          this.friends = friends;
        });
    }
    else {
      this.router.navigate(['login']);
    }
  }
  getActivities(friend:any, index: number) {
    let url;
    if(this.authService.getUser()===friend.email){
      url=`/activities?email=${friend.email}`;
    }else{
      let isPrivate=false;
      url=`/activities?email=${friend.email}&isPrivate=${isPrivate}`
    }
    const actObj = {
      uri: url,
    };
    for (let i = 0; i < this.friends.length; i++) {
      this.friends[i].isOpen = false;
    }
    this.httpClient.get(actObj)
      .subscribe(activities => {
        if (activities.length > 0) {
          this.activities = activities;
          this.friends[index].isOpen = true;
          this.showHide = !this.showHide;
        }
      });
  }
}
