import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  constructor() {

  }
  getAuth() {
    return localStorage.getItem('authToken');
  }
  setAuth() {
    localStorage.setItem('authToken', 'true');
  }
  removeAuth() {
    localStorage.setItem('authToken', 'false');
  }
  getUser() {
    return localStorage.getItem('user');
  }
  removeUser() {
    localStorage.setItem('user', '');
  }
  setUser(user: string) {
    localStorage.setItem('user', user);
  }
}
