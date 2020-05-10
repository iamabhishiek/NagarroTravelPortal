import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Service } from '../service/service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  userId: string;
  constructor(
    private _userService: Service,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  raiseTickets(): void {
    this.userId = this.route.snapshot.params.id;
    this.router.navigate(['ticket/' + this.userId]);
  }
  viewTickets(): void {
    this.userId = this.route.snapshot.params.id;
    this.router.navigate(['viewticket/' + this.userId]);
  }
}
