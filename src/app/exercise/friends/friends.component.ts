import { Component, OnInit, Injectable } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Router } from '@angular/router';
import { CustomAuthService } from '../../services/custom.auth.service';
import { NotificationsService } from '../../services/notifications.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, tap, switchMap, merge} from 'rxjs/operators';
import { FilterPipe } from '../../filter.pipe';



const WIKI_URL = 'https://en.wikipedia.org/w/api.php';
const PARAMS = new HttpParams({
  fromObject: {
    action: 'opensearch',
    format: 'json',
    origin: '*'
  }
});
export class WikipediaService {
  constructor(private http: HttpClient) {}

  search(term: string) {
    if (term === '') {
      return of([]);
    }

    return this.http
      .get(WIKI_URL, {params: PARAMS.set('search', term)}).pipe(
        map(response => response[1])
      );
  }
}

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  private friends: any;
  private activities: any;
  private click: boolean;
  private showHide: any;
  searching = false;
  searchFailed = false;
  hideSearchingWhenUnsubscribed = new Observable(() => () => this.searching = false);

  constructor(private httpClient: HttpService, 
              private router: Router, 
              private authService: CustomAuthService,
              private _service: WikipediaService,
              private _Messages: NotificationsService,
              private filterPipe: FilterPipe) { }

  ngOnInit() {

    if (this.authService.getAuth()) {
      const reqObj = {
        uri: '/friends',
      };
      this.httpClient.get(reqObj)
        .subscribe(friends => {
          for (let i = 0; i < friends.length; i++) {
            friends[i].isOpen = false;
          }
          this.friends = friends;
        });
    }
    else {
      this.router.navigate(['login']);
    }
  }

  getActivities(friend:any, index: number) {
    let url;
    if(this.authService.getUser()===friend.email){
      url=`/activities?email=${friend.email}`;
    }else{
      let isPrivate=false;
      url=`/activities?email=${friend.email}&isPrivate=${isPrivate}`
    }
    const actObj = {
      uri: url,
    };
    for (let i = 0; i < this.friends.length; i++) {
      this.friends[i].isOpen = false;
    }
    this.httpClient.get(actObj)
      .subscribe(activities => {
        if (activities.length > 0) {
          this.activities = activities;
          this.friends[index].isOpen = true;
          this.showHide = !this.showHide;
        }
      });
  }



  search(term: string) {
    if (term === '') {
      return of([]);
    }

    const reqObj = {
      uri:WIKI_URL,
    };
      this.httpClient.get(reqObj)
        .subscribe(friends => {
          for (let i = 0; i < friends.length; i++) {
            this.httpClient.get(reqObj)
        .subscribe(friends => {
          for (let i = 0; i < friends.length; i++) {
            friends[i].isOpen = false;
          }
          this.friends = friends;
        }); 
      }

    
    }
  }


  


// search(){
//   let searchText: any;
//   return this.filterPipe.transform(this.friends, searchText)
//     }

    
    
