import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { MessagesComponent } from './messages/messages.component';
import { HomeComponent } from './home/home.component';
import { FriendsComponent } from './friends/friends.component';
import { WorkoutsComponent } from './workouts/workouts.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { NotificationsComponent } from './notifications/notifications.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    MessagesComponent,
    HomeComponent,
    FriendsComponent,
    WorkoutsComponent,
    SignupComponent,
    LoginComponent,
    NotificationsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
        { path: 'home', component: HomeComponent },
        { path: 'workouts', component: WorkoutsComponent },
        { path: 'friends', component: FriendsComponent },
        { path: 'signup', component: SignupComponent },
        { path: 'login', component: LoginComponent },
        { path: 'notifications', component: NotificationsComponent },
        { path: '', redirectTo: '/home', pathMatch: 'full'}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }