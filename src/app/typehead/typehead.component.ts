import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Router } from '@angular/router';
import { NotificationsService } from '../services/notifications.service';
import { CustomAuthService } from '../services/custom.auth.service';
import { Pipe, PipeTransform } from '@angular/core';



@Pipe({
  name: 'filter'
})
@Component({
  selector: 'app-typehead',
  templateUrl: './typehead.component.html',
  styleUrls: ['./typehead.component.css']
})
export class TypeheadComponent implements PipeTransform {


  transform(items: any[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter( it => {
      return it.toLowerCase().includes(searchText);
    });
   }

  constructor(private httpClient: HttpService, 
    private router: Router, 
    private authService: CustomAuthService,) { }

  ngOnInit() {
  }
}
