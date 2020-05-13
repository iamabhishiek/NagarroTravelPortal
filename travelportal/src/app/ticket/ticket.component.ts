import { Component, OnInit } from '@angular/core';
import { Ticket } from '../ticket/ticket';
import { Service } from '../service/service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css'],
})
export class TicketComponent implements OnInit {
  ticketForm: FormGroup;
  loading = false;
  submitted = false;
  userId: string;
  ticketId: string;
  users: Ticket[];
  user = new Ticket();
  buttoname: string;
  constructor(
    private _userService: Service,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.ticketForm = this.formBuilder.group({
      additional: ['', Validators.required],
      city: ['', Validators.required],
      endate: ['', Validators.required],
      expecteduration: ['', Validators.required],
      expenseborn: ['', [Validators.required, Validators.email]],
      fromcity: ['', [Validators.required, Validators.maxLength(15)]],
      passportnumber: ['', Validators.required],
      priority: [''],
      projectname: ['', Validators.required],
      requestype: ['', Validators.required],
      startdate: ['', Validators.required],
      travelapprover: ['', Validators.required],
      upperbound: ['', Validators.required],
    });
    this.route.queryParams.subscribe((params) => {
      this.buttoname = 'Submit';
      this.ticketId = this.route.snapshot.params.ticketId;
      this.userId = this.route.snapshot.params.id;
      console.log(this.ticketId);
      if (this.ticketId !== undefined) {
        this.buttoname = 'Update';
        this.getUserById(this.userId, this.ticketId);
      }
    });
  }

  get f() {
    return this.ticketForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.ticketForm.invalid) {
      return;
    }
    this.user.additional = this.f.additional.value;
    this.user.city = this.f.city.value;
    this.user.endate = this.f.endate.value;
    this.user.expectduration = this.f.expectduration.value;
    this.user.expenseborn = this.f.expenseborn.value;
    this.user.fromcity = this.f.fromcity.value;
    this.user.passportnumber = this.f.passportnumber.value;
    this.user.priority = this.f.priority.value;
    this.user.projectname = this.f.projectname.value;
    this.user.requestype = this.f.requestype.value;
    this.user.startdate = this.f.startdate.value;
    this.user.travelapprover = this.f.travelapprover.value;
    this.user.upperbound = this.f.upperbound.value;
    this.addUser();
  }

  addUser(): void {
    if (this.buttoname === 'Submit') {
      this.userId = this.route.snapshot.params.id;
      this._userService
        .addTicket(this.userId, this.user)
        .subscribe((response) => {
          let resStr = JSON.stringify(response);
          console.log(resStr);
          var id = resStr;
          alert(id);
          this.router.navigate(['successticket/' + this.userId + '/' + id]);
        });
    } else {
      this._userService
        .addTicket(this.ticketId, this.user)
        .subscribe((response) => {
          let resStr = JSON.stringify(response);
          var id = resStr;
          this.router.navigate(['successticket/' + this.userId + '/' + id]);
          console.log(response);
        });
    }
  }

  getUserById(userId: string, ticketId: string): void {
    this._userService.getTicketById(userId, ticketId).subscribe(
      (userData) => {
        this.user = userData;
        this.ticketForm.setValue({
          additional: this.user.additional,
          city: this.user.city,
          endate: this.user.endate,
          expecteduration: this.user.expectduration,
          expenseborn: this.user.expenseborn,
          fromcity: this.user.fromcity,
          passportnumber: this.user.passportnumber,
          priority: this.user.priority,
          projectname: this.user.projectname,
          requestype: this.user.requestype,
          startdate: this.user.startdate,
          travelapprover: this.user.travelapprover,
          upperbound: this.user.upperbound,
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
