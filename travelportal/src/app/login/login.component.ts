// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }

import { Component, OnInit } from '@angular/core';
import { Service } from '../service/service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Login } from './login';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  userId: string;
  users: Login[];
  user = new Login();
  buttoname: string;
  msg: string;
  constructor(
    private _userService: Service,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onLogin(): void {
    this.submitted = true;

    //stop if form is invaid
    if (this.registerForm.invalid) {
      return;
    }

    this.user.username = this.f.username.value;
    this.user.password = this.f.password.value;

    this.login();
  }
  login(): void {
    this._userService.LoginUser(this.user).subscribe((response) => {
      let resStr = JSON.stringify(response);
      if (resStr === 'true') {
        this.router.navigate(['homepage/' + this.user.username]);
      }
      if (resStr === 'false') {
        this.msg = 'Username or Password Incorrect';
      }
    });
  }
}
