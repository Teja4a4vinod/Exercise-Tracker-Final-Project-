import { Component, OnInit } from '@angular/core';
import { CustomAuthService } from '../../services/custom.auth.service';
import { Router } from '@angular/router';
import { NotificationsService } from '../../services/notifications.service';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  constructor(private httpClient: HttpService,
              private authService: CustomAuthService,
              private router: Router,
              private _Messages: NotificationsService) { }

  ngOnInit() {
    if (!this.authService.getAuth()) {
      this.router.navigate(['login']);
    }
  }

}
