import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../login/login';
import { Register } from '../registration/regitration';
import { forget } from '../forget/forget';
import { Observable } from 'rxjs';
import {
  Http,
  Response,
  RequestOptions,
  Headers,
  ResponseType,
} from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Ticket } from '../ticketraised/ticket';
@Injectable()
export class UserService {
  isLoggedIn: boolean = false;

  constructor(private _httpService: HttpClient, private router: Router) {}

  LoginUser(user: Login) {
    return this._httpService.get(
      'http://localhost:8080/travelPortal/api/login/' +
        user.username +
        '/' +
        user.password
    );
  }

  AdminUser(user: Login) {
    return this._httpService.get(
      'http://localhost:8080/travelPortal/api/admin/' +
        user.username +
        '/' +
        user.password
    );
  }

  addUser(user: Register) {
    let body = JSON.stringify(user);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    return this._httpService.post(
      'http://localhost:8080/travelPortal/api/user/',
      body,
      options
    );
  }

  addTicket(username: string, user: Ticket) {
    let body = JSON.stringify(user);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    return this._httpService.post(
      'http://localhost:8080/travelPortal/api/ticket/' + username,
      body,
      options
    );
  }

  Forget(user: String) {
    let body = '';
    return this._httpService.put(
      'http://localhost:8080/travelPortal/api/forget/' + user,
      body
    );
  }

  getUserById(userId: string): Observable<Register> {
    return this._httpService.get<Register>(
      'http://localhost:8080/travelPortal/api/user/' + userId
    );
  }

  getTicketById(userId: string, ticketId: string): Observable<Ticket> {
    return this._httpService.get<Ticket>(
      'http://localhost:8080/travelPortal/api/ticket/' + userId + '/' + ticketId
    );
  }

  getTicketByIdonly(userId: string): Observable<Ticket> {
    return this._httpService.get<Ticket>(
      'http://localhost:8080/travelPortal/api/ticketid/' + userId
    );
  }

  getTicket(userId: string): Observable<any> {
    return this._httpService.get<any>(
      'http://localhost:8080/travelPortal/api/ticket/' + userId
    );
  }

  getAllTicket(): Observable<Ticket[]> {
    return this._httpService.get<Ticket[]>(
      'http://localhost:8080/travelPortal/api/ticket'
    );
  }

  getBlob(ticketId: string) {
    return this._httpService.get(
      'http://localhost:8080/travelPortal/api/ticketfile/' + ticketId,
      { observe: 'body', responseType: 'arraybuffer' }
    );
  }

  edit(id: String, user: Register) {
    let body = JSON.stringify(user);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    return this._httpService.put(
      'http://localhost:8080/travelPortal/api/user/' + id,
      body,
      options
    );
  }

  editicket(userid: string, ticketid: String, user: Ticket) {
    let body = JSON.stringify(user);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    return this._httpService.put(
      'http://localhost:8080/travelPortal/api/ticket/' +
        userid +
        '/' +
        ticketid,
      body,
      options
    );
  }

  postFile(fileToUpload: FormData, ticketId: string): Observable<boolean> {
    const endpoint =
      'http://localhost:8080/travelPortal/api/upload/' + ticketId;
    console.log(fileToUpload);
    return this._httpService.post(endpoint, fileToUpload).pipe(
      map(() => {
        return true;
      })
    );
  }

  getCountries() {
    return this._httpService
      .get('https://restcountries.eu/rest/v2/all')
      .pipe(map((result) => result));
  }

  getCovid() {
    return this._httpService
      .get('https://akashraj.tech/corona/api')
      .pipe(map((result) => result));
  }
}
