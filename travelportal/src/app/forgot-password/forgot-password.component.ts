import { Component, OnInit } from '@angular/core';
import { forget } from './forgot-password';
import { Service } from '../service/service';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  forgetForm: FormGroup;
  loading = false;
  submitted = false;
  userId: string;
  users: forget[];
  user = new forget();
  constructor(
    private _userService: Service,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.getUsers();
    this.forgetForm = this.formBuilder.group({
      userName: ['', Validators.required],
    });
  }

  //get all the inputs combined in a function
  get f() {
    return this.forgetForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    //stop if form is invaid
    if (this.forgetForm.invalid) {
      return;
    }

    this.user.userName = this.f.userName.value;
    this.addUser();
  }

  addUser(): void {
    this._userService.Forget(this.user.userName).subscribe((response) => {
      // let resStr = JSON.stringify(response);
      // let resJSON = JSON.parse(resStr);

      // var id =resJSON._body.substring(resJSON._body.lastIndexOf(':') + 1);
      // console.log(id);
      this.router.navigate(['login/login']);
      console.log(response);
    });
  }
}
