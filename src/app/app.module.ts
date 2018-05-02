import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { MessagesComponent } from './messages/messages.component';
import { HomeComponent } from './home/home.component';
import { FriendsComponent } from './exercise/friends/friends.component';
import { WorkoutsComponent } from './exercise/workouts/workouts.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { NotificationsComponent } from './exercise/notifications/notifications.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpService } from './services/http.service';
import { HttpModule } from '@angular/http';
import { AuthService } from './services/auth.service';
import { PopoverComponent } from './popover/popover.component';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToasterModule } from 'angular2-toaster/src/toaster.module';

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
    NotificationsComponent,
    ExerciseComponent,
    PopoverComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    ToasterModule.forRoot(),
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: 'workouts', component: WorkoutsComponent },
      { path: 'friends', component: FriendsComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'login', component: LoginComponent },
      { path: 'notifications', component: NotificationsComponent },
      { path: '', redirectTo: '/home', pathMatch: 'full' }
    ])
  ],
  providers: [HttpService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
