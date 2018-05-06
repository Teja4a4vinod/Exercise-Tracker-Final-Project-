import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private httpClient: HttpService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    if (!this.authService.getAuth()) {
      this.router.navigate(['login']);
    }
  }

}
