import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  private authToken: any;
  constructor(private router: Router, private authService: AuthService, private httpClient: HttpService) { }

  ngOnInit() {
    this.authToken = this.authService.getAuth();
  }
  logout(): any {
    const reqObj = {
      body: {email:this.authService.getUser()},
      uri: '/logout',
    };
    this.httpClient.post(reqObj)
      .subscribe(data => {
        if (data.status) {
          this.authService.removeAuth();
          this.authService.removeUser();
          this.checkAuth();
          this.router.navigate(['login']);
        }
      }, err => console.log(err));

  }
  checkAuth() {
    if (this.authService.getAuth() === 'false') {
      return false;
    } else {
      return true;
    }
  }
}
