import { Component, OnInit } from '@angular/core';
import { forget } from './forgot-password';
import { Service } from '../service/service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  msg: string;
  constructor(
    private service: Service,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.forgetForm = this.formBuilder.group({
      userName: ['', Validators.required],
    });
  }

  get f() {
    return this.forgetForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.forgetForm.invalid) {
      this.msg = 'null';
      return;
    }

    this.user.userName = this.f.userName.value;
    this.addUser();
  }

  addUser(): void {
    this.service.Forget(this.user.userName).subscribe((response) => {
      console.log(response);
    });
    this.router.navigate(['login']);
  }
}
