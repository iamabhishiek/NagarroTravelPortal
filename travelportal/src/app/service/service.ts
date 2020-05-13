import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../login/login';
import { Register } from '../registration/registration';
import { forget } from '../forgot-password/forgot-password';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Ticket } from '../ticket/ticket';
@Injectable()
export class Service {
  isLoggedIn: boolean = false;

  constructor(private _httpService: HttpClient, private router: Router) {}

  LoginUser(user: Login) {
    return this._httpService.get(
      'http://localhost:8081/travelPortal/api/login/' +
        user.username +
        '/' +
        user.password
    );
  }
  getUserType(username: string, password: string): Observable<Login> {
    return this._httpService.get<Login>(
      'http://localhost:8081/travelPortal/api/usertype/' +
        username +
        '/' +
        password
    );
  }

  addUser(user: Register) {
    let body = JSON.stringify(user);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    return this._httpService.post(
      'http://localhost:8081/travelPortal/api/user/',
      body,
      options
    );
  }
  edit(id: String, user: Register) {
    let body = JSON.stringify(user);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    return this._httpService.put(
      'http://localhost:8081/travelPortal/api/user/' + id,
      body,
      options
    );
  }
  addTicket(username: string, user: Ticket) {
    let body = JSON.stringify(user);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    return this._httpService.post(
      'http://localhost:8081/travelPortal/api/ticket/' + username,
      body,
      options
    );
  }

  Forget(user: String) {
    let body = '';
    return this._httpService.put(
      'http://localhost:8081/travelPortal/api/forget/' + user,
      body
    );
  }

  getUserById(userId: string): Observable<Register> {
    return this._httpService.get<Register>(
      'http://localhost:8081/travelPortal/api/user/' + userId
    );
  }

  getTicketById(userId: string, ticketId: string): Observable<Ticket> {
    return this._httpService.get<Ticket>(
      'http://localhost:8081/travelPortal/api/ticket/' + userId + '/' + ticketId
    );
  }

  getTicket(userId: string): Observable<any> {
    return this._httpService.get<Ticket>(
      'http://localhost:8081/travelPortal/api/ticket/' + userId
    );
  }

  getAllTicket(): Observable<any> {
    return this._httpService.get<any>(
      'http://localhost:8081/travelPortal/api/ticket'
    );
  }

  editicket(id: String, user: Ticket) {
    let body = JSON.stringify(user);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    return this._httpService.put(
      'http://localhost:8081/travelPortal/api/ticket/' + id,
      body,
      options
    );
  }
  AdminUser(user: Login) {
    return this._httpService.get(
      'http://localhost:8081/travelPortal/api/admin/' +
        user.username +
        '/' +
        user.password
    );
  }
  editTicketStatus(userid: string, status: string) {
    console.log(status);
    let body = status;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    return this._httpService.put(
      'http://localhost:8081/travelPortal/api/userticket/' + userid,
      body,
      options
    );
  }
  getTicketByIdonly(userId: string): Observable<Ticket> {
    return this._httpService.get<Ticket>(
      'http://localhost:8081/travelPortal/api/ticketid/' + userId
    );
  }
}
