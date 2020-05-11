import { Component, OnInit } from '@angular/core';
import { StringifyOptions } from 'querystring';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  vis: boolean;

  constructor(private myrouter: Router, private myhttp: HttpClient) {
    console.log('con running');
    myrouter.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });
  }
  ngOnInit(): void {
    if (sessionStorage.getItem('name') != null) {
      this.vis = false;
    } else {
      this.vis = true;
    }
  }
  onlogout() {
    sessionStorage.clear();
    this.myrouter.navigateByUrl('login');
  }
}
