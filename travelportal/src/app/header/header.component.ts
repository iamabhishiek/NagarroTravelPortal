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
  username: string;

  constructor(private myrouter: Router, private myhttp: HttpClient) {
    myrouter.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });
  }
  ngOnInit(): void {
    this.username = sessionStorage.getItem('name');
    // alert(this.username);
    if (sessionStorage.getItem('name') != null) {
      this.vis = false;
    } else {
      this.vis = true;
    }
  }

  onLogin() {
    sessionStorage.setItem('name', 'u');
    this.ngOnInit();
    this.myrouter.navigateByUrl('/login');
    this.username = sessionStorage.getitem('name');
  }
  onLogout() {
    sessionStorage.clear();
    this.ngOnInit();
    this.myrouter.navigateByUrl('/login');
  }
}
