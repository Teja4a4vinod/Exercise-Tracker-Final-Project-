import { Component, OnInit } from '@angular/core';
import { Exercise, User, Workout, Notification } from '../../model/exercise';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.css']
})
export class WorkoutsComponent implements OnInit {


  Model = new Exercise();
  Me: User;

  constructor() { }

  ngOnInit() {
  }

  submitActivity(e: MouseEvent, text: string){
    e.preventDefault();
  this.Model.Activities.push({Workout:text, UserId: this.Me.UserName, Name:this.Me.UserName})

  }
}
