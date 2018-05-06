import { Component, OnInit } from '@angular/core';
import { Exercise, User, Workout, Notification } from '../../model/exercise';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NotificationsService } from '../../services/notifications.service';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.css']
})
export class WorkoutsComponent implements OnInit {
  private activities: any;
  private workouts: any;
  private isOpen: Boolean = false;
  private isPrivate: Boolean = false;
  private activity: String = '';
  constructor(private httpClient: HttpService, 
              private authService: AuthService,
              private router: Router,
              private _Messages: NotificationsService) { }

  ngOnInit() {
    if (this.authService.getAuth() === 'true') {
      this.getActivities(this.authService.getUser());
      this.getWorkouts();
    } else {
      this.router.navigate(['login']);
    }
  }
  edit(item: any, index: any) {
    this.workouts[index].show = true;
  }
  cancel(index: any) {
    this.activity = '';
    this.workouts[index].show = false;
  }
  post(item: any, index: any) {
    const user = this.authService.getUser();
    const reqObj = {
      uri: '/activity',
      body: { activity: item, email: user, value: this.activity,isPrivate:this.isPrivate }
    };
    this.httpClient.post(reqObj)
      .subscribe(data => {
        if (data.status) {
          this.workouts[index].show = false;
          this.activity = '';
          this.getActivities(this.authService.getUser());
        }
      });
      this._Messages.Messages.push({ Text: 'New activity is posted by ' +user, Type: 'success'})
  }
  getWorkouts() {
    const worObj = {
      uri: '/workouts',
    };
    this.httpClient.get(worObj)
      .subscribe(workouts => {
        this.workouts = workouts;
        for (let i = 0; i < this.workouts.length; i++) {
          this.workouts[i].show = false;
          
        }
      });
  }
  getActivities(email: string) {
    const actObj = {
      uri: `/activities?email=${email}`,
    };
    this.httpClient.get(actObj)
      .subscribe(activities => {
        for (let i = 0; i < activities.length; i++) {
          activities[i].isOpen = false;
        }
        this.activities = activities;
        
      });
      
  }
}
