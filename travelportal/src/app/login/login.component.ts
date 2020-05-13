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
  type: string;
  constructor(
    private service: Service,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}
  ngOnInit(): void {
    sessionStorage.clear();
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  get f() {
    return this.registerForm.controls;
  }
  onLogin(): void {
    //stop if form is invaid
    if (this.registerForm.invalid) {
      return;
    }
    this.user.username = this.f.username.value;
    this.user.password = this.f.password.value;
    this.login();
  }
  login(): void {
    this.service.LoginUser(this.user).subscribe((response) => {
      let resStr = JSON.stringify(response);
      if (resStr === 'true') {
        this.getUserType();
        sessionStorage.setItem('name', this.user.username);
      }
      if (resStr === 'false') {
        this.msg = 'Username or Password Incorrect';
      }
    });
  }
  getUserType(): void {
    // alert('hello');
    this.service.getUserType(this.user.username, this.user.password).subscribe(
      (userData) => {
        this.type = userData.type;
        if (this.type == 'admin') this.router.navigate(['adminhomepage/']);
        else this.router.navigate(['homepage/' + this.user.username]);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
