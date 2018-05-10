import { Component, OnInit, Inject, Injectable, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { Router } from '@angular/router';
import { CustomAuthService } from '../services/custom.auth.service';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';
import { NotificationsService } from '../services/notifications.service';

declare var googleyolo: any;
declare var FB: any;
declare var window: any;

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
              private _auth: CustomAuthService,
        
            private _Messages: NotificationsService) {
    this.toasterService = toasterService;
    this.signupForm = new FormGroup({
      email: new FormControl(),
      username: new FormControl(),
      password: new FormControl()
    });
    window.fbAsyncInit = () => {
      FB.init({
          appId      : '561602290896109',
          cookie     : true,
          xfbml      : true,
          version    : 'v2.12'
      });
          
      FB.AppEvents.logPageView();   
  };

  (function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = <HTMLScriptElement>d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
  }


  fbSignup(){
    let self=this;
    FB.login((credentials:any)=>{
        FB.api("/me?fields=email,name,picture", (response: any)=> {
          const obj = {email: response.email, username: response.email.split('@')[0],password: 123}
          const reqObj = {
            body: obj,
            uri: '/register',
          };
          if (reqObj.body.username && reqObj.body.email && reqObj.body.password) {
            this.httpClient.post(reqObj)
              .subscribe(data => {
                if (data.status) {
                  window.location.href='/login';
                  this._Messages.Messages.push({ Text:'WELCOME to Exercise Tracker Application ' +reqObj.body.username, Type: 'success'})
                }
              });
          } else {
            console.log('required parameters are missing');
          }
              
         
  
          })
    }, { scope: "email,user_photos" })
}
googleSignup(){
  googleyolo.hint({
      supportedAuthMethods: [
      "https://accounts.google.com"
      ],
      supportedIdTokenProviders: [
          {
              uri: "https://accounts.google.com",
              clientId: "127811445743-8uo1b7vbretscar7t4kmuqiu8mhq04a5.apps.googleusercontent.com"
          }
      ]
  }).then((credentials: any) =>{
    const obj = {email: credentials.id, username: credentials.id.split('@')[0], password: 123}
    const reqObj = {
      body: obj,
      uri: '/register',
    };
    if (reqObj.body.username && reqObj.body.email && reqObj.body.password) {
      this.httpClient.post(reqObj)
        .subscribe(data => {
          if (data.status) {
            this.router.navigate(['login']);
            
          }
        });
    } else {
      console.log('required parameters are missing');
    }
     
  })
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
