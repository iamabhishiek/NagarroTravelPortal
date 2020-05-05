// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-forgot-password',
//   templateUrl: './forgot-password.component.html',
//   styleUrls: ['./forgot-password.component.css']
// })
// export class ForgotPasswordComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
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
    private service: Service,
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
    if (this.forgetForm.invalid) {
      return;
    }
    this.user.userName = this.f.userName.value;
    this.addUser();
  }
  addUser(): void {
    this.service.Forget(this.user.userName).subscribe((response) => {
      this.router.navigate(['user/' + 1]);
      console.log(response);
    });
  }
}
