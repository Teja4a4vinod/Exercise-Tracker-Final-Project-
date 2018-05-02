import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  private friends: any;
  constructor(private httpClient: HttpService, private router: Router, private authService: AuthService) { }

  ngOnInit() {

    if (this.authService.getAuth() === 'true') {
      const reqObj = {
        uri: '/friends',
      };
      this.httpClient.get(reqObj)
        .subscribe(friends => {
          this.friends = friends;
        });
    } else {
      this.router.navigate(['login']);
    }
  }
}
