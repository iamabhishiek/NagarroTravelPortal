import { Component, OnInit } from '@angular/core';
import { UserService } from '../userservice/userservice';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormGroup,
  Validators,
  FormControl,
  EmailValidator,
  AbstractControl,
} from '@angular/forms';
import { Login } from './login';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loading = false;
  submitted = false;
  userId: string;
  users: Login[];
  user = new Login();
  buttoname: string;
  heading: string;
  msg: string;
  ForgetPassword: string;
  Register: string;
  constructor(
    private _userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  form = new FormGroup({
    username: new FormControl('', [Validators.required, emaildomain]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.userId = this.route.snapshot.params.id;
      this.heading = 'Login Form';
      this.buttoname = 'Login';
      this.ForgetPassword = 'Forget Password';
      this.Register = 'New User? Register Here';

      if (this.userId === 'user') {
        this.heading = 'Login Form';
        this.buttoname = 'Login';
        this.ForgetPassword = 'Forget Password';
        this.Register = 'New User? Register Here';
      }
      if (this.userId === 'admin') {
        this.heading = 'Admin Form';
        this.buttoname = 'Admin Login';
        this.ForgetPassword = '';
        this.Register = '';
      }
    });
  }

  get f() {
    return this.form.controls;
  }

  onLogin(): void {
    this.submitted = true;

    //stop if form is invaid
    if (this.form.invalid) {
      return;
    }

    this.user.username = this.f.username.value;
    this.user.password = this.f.password.value;

    this.login();
  }
  login(): void {
    if (this.userId === 'login' || this.userId === undefined) {
      this._userService.LoginUser(this.user).subscribe((response) => {
        let resStr = JSON.stringify(response);
        if (resStr === 'true') {
          localStorage.setItem('auth', resStr);
          this.router.navigate(['homepage/' + this.user.username]);
        }
        if (resStr === 'false') {
          this.msg = 'Username or Password Incorrect';
        }
      });
    } else if (this.userId === 'admin') {
      this._userService.AdminUser(this.user).subscribe((response) => {
        let resStr = JSON.stringify(response);
        if (resStr === 'true') {
          localStorage.setItem('auth', resStr);
          this.router.navigate(['adminhomepage']);
        }
        if (resStr === 'false') {
          alert('Username or Password Incorrect');
        }
      });
    }
  }
}

function emaildomain(control: AbstractControl): { [key: string]: any } | null {
  const email: string = control.value;
  const domain = email.substring(email.lastIndexOf('@') + 1);
  if (email === '' || domain.toLocaleLowerCase() === 'nagarro.com') {
    return null;
  } else {
    return { emaildomain: true };
  }
}
