import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Router } from '@angular/router';
import { CustomAuthService } from '../services/custom.auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private httpClient: HttpService, private router: Router, private authService: CustomAuthService) { }

  ngOnInit() {
    if (!this.authService.getAuth()) {
      this.router.navigate(['login']);
    }
  }

}
