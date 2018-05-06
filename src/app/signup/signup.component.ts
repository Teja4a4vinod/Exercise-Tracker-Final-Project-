import { Component, OnInit, Inject, Injectable, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';
import { NotificationsService } from '../services/notifications.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  private signupForm: FormGroup;
  public config1: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-top-right',
    animation: 'fade'
  });

  constructor(private toasterService: ToasterService, 
              private httpClient: HttpService, 
              private router: Router, 
              private authService: AuthService,
            private _Messages: NotificationsService) {
    this.toasterService = toasterService;
    this.signupForm = new FormGroup({
      email: new FormControl(),
      username: new FormControl(),
      password: new FormControl()
    });
  }


  ngOnInit() {
  }
  register(form: FormGroup) {
    const reqObj = {
      body: form.value,
      uri: '/register',
    };
    if (reqObj.body.username && reqObj.body.email && reqObj.body.password) {
      this.httpClient.post(reqObj)
        .subscribe(data => {
          if (data.status) {
            this.router.navigate(['login']);
            this._Messages.Messages.push({ Text:'WELCOME to Exercise Tracker Application ' +reqObj.body.username, Type: 'success'})
          }
        });
    } else {
      console.log('required parameters are missing');
    }
  }
}
