import { Component, OnInit } from '@angular/core';
import { Service } from '../service/service';
import { Register } from '../registration/registration';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-confirmregistration',
  templateUrl: './confirmregistration.component.html',
  styleUrls: ['./confirmregistration.component.css'],
})
export class ConfirmregistrationComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  userId: string;
  users: Register[];
  user = new Register();
  constructor(
    private _userService: Service,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      businessunit: ['', Validators.required],
      title: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required, Validators.maxLength(15)]],
      address1: ['', Validators.required],
      address2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      country: ['', Validators.required],
    });
    this.route.queryParams.subscribe((params) => {
      this.userId = this.route.snapshot.params.id;
      if (this.userId !== undefined) {
        this.getUserById(this.userId);
      }
    });
  }

  getUserById(userId: string): void {
    this._userService.getUserById(userId).subscribe(
      (userData) => {
        this.user = userData;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  Return(): void {
    this.router.navigate(['homepage/' + this.user.email]);
  }
  Edit(): void {
    this.userId = this.route.snapshot.params.id;
    if (this.userId !== undefined) {
      this.router.navigate(['register/' + this.userId]);
    }
  }
}
