import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Service } from '../service/service';
import { Ticket } from '../ticket/ticket';
@Component({
  selector: 'app-confirm-ticket',
  templateUrl: './confirm-ticket.component.html',
  styleUrls: ['./confirm-ticket.component.css'],
})
export class ConfirmTicketComponent implements OnInit {
  ticketForm: FormGroup;
  loading = false;
  submitted = false;
  userId: string;
  ticketId: string;
  users: Ticket[];
  user = new Ticket();
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
      this.ticketId = this.route.snapshot.params.ticketId;
      this.userId = this.route.snapshot.params.userId;
      if (this.ticketId !== undefined) {
        this.getTicketById(this.userId, this.ticketId);
      }
    });
  }
  Return(): void {
    this.userId = this.route.snapshot.params.id;
    this.router.navigate(['homepage/' + this.userId]);
  }
  Edit(): void {
    this.userId = this.route.snapshot.params.id;
    this.ticketId = this.route.snapshot.params.ticketId;
    if (this.userId !== undefined) {
      this.router.navigate(['ticket/' + this.userId + '/' + this.ticketId]);
    }
  }

  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('main').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
          //........Customized style.......
          </style>
        </head>
      <body onload="window.print();window.close()">${printContents}</body>
      </html>`);
    popupWin.document.close();
  }

  getTicketById(userId: string, ticketId: string): void {
    this._userService.getTicketById(userId, ticketId).subscribe(
      (userData) => {
        this.user = userData;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
