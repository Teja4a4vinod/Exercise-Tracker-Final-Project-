import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NotificationsService } from '../services/notifications.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private loginForm: any;
  constructor(private httpClient: HttpService,
              private router: Router, 
              private authService: AuthService,
              private _Messages: NotificationsService) {
      this.loginForm = new FormGroup({
      userName: new FormControl(),
      email: new FormControl(),
      password: new FormControl()
    });
  }

  ngOnInit() {
    if (this.authService.getAuth()) {
      this.router.navigate(['friends']);
    } 
  }
  login(form: any) {
    const reqObj = {
      body: form.value,
      uri: '/login',
    };
    this.httpClient.post(reqObj)
      .subscribe(data => {
        if (data.status) {
          this.authService.setAuth();
          this.authService.setUser(form.value.email);
          this.router.navigate(['friends']);
          this._Messages.Messages.push({ Text: form.value.email +' is now logged into the application' , Type: 'success'})
        }
      },err=>console.log(err));
  }
}
