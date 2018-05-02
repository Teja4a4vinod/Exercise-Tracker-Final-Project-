import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private loginForm: any;
  constructor(private httpClient: HttpService, private router: Router, private authService: AuthService) {
    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  ngOnInit() {
    if (this.authService.getAuth() === 'true') {
      this.router.navigate(['friends']);
    } else {
      this.router.navigate(['login']);
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
        }
      },err=>console.log(err));
  }
}
