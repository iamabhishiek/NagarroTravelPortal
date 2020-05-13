import { Component, OnInit } from '@angular/core';
import { Register } from './registration';
import { Service } from '../service/service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  userId: string;
  users: Register[];
  user = new Register();
  buttoname: string;
  msg: string;
  constructor(
    private service: Service,
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
      telephone: [
        '',
        [
          Validators.required,
          Validators.maxLength(15),
          Validators.minLength(10),
        ],
      ],
      address1: ['', Validators.required],
      address2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      country: ['', Validators.required],
    });
    this.route.queryParams.subscribe((params) => {
      this.buttoname = 'Submit';
      this.userId = this.route.snapshot.params.id;
      if (this.userId !== undefined) {
        this.buttoname = 'Update';
        this.getUserById(this.userId);
      }
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    //stop if form is invaid

    if (this.registerForm.invalid) {
      this.msg = 'All fields are mandatary Except address 2';

      return;
    }
    this.user.firstName = this.f.firstName.value;
    this.user.lastName = this.f.lastName.value;
    this.user.businessUnit = this.f.businessunit.value;
    this.user.title = this.f.title.value;
    this.user.email = this.f.email.value;
    this.user.telephone = this.f.telephone.value;
    this.user.address1 = this.f.address1.value;
    this.user.address2 = this.f.address2.value;
    this.user.city = this.f.city.value;
    this.user.state = this.f.state.value;
    this.user.country = this.f.country.value;
    this.user.zip = this.f.zip.value;
    this.addUser();
  }
  addUser(): void {
    if (this.user.email.substr(this.user.email.length - 12) != '@nagarro.com') {
      this.msg = 'Invalid Email';
      return;
    }
    if (this.user.telephone >= 10000000000000000) {
      this.msg = 'Invalid phone no.';
      return;
    }
    if (this.buttoname === 'Submit') {
      this.service.addUser(this.user).subscribe((response) => {
        let resStr = JSON.stringify(response);
        var id = resStr;
        this.router.navigate(['success/' + id]);
      });
    }
    if (this.buttoname === 'Update') {
      this.service.edit(this.userId, this.user).subscribe((response) => {
        let resStr = JSON.stringify(response);
        var id = resStr;
        this.router.navigate(['success/' + id]);
        console.log(response);
      });
    }
  }
  getUserById(userId: string): void {
    this.service.getUserById(userId).subscribe(
      (userData) => {
        this.user = userData;
        this.registerForm.setValue({
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          businessunit: this.user.businessUnit,
          title: this.user.title,
          email: this.user.email,
          telephone: this.user.telephone,
          address1: this.user.address1,
          address2: this.user.address2,
          city: this.user.city,
          state: this.user.state,
          zip: this.user.zip,
          country: this.user.country,
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
