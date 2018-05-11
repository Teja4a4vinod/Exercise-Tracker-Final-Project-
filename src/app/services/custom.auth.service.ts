import { Injectable } from '@angular/core';

@Injectable()
export class CustomAuthService {
  constructor() {

  }
  getAuth() {
    return localStorage.getItem('authToken');
  }
  setAuth() {
    localStorage.setItem('authToken', 'true');
  }
  removeAuth() {
    localStorage.removeItem('authToken');
  }
  getUser() {
    return localStorage.getItem('user');
  }
  removeUser() {
    localStorage.removeItem('user');
  }
  setUser(user: string) {
    localStorage.setItem('user', user);
  }
  getSocialUser() {
    return localStorage.getItem('socialUser');
  }
  removeSocialUser() {
    localStorage.removeItem('socialUser');
  }
  setSocialUser(user: string) {
    localStorage.setItem('socialUser', user);
  }
}
