import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { Service } from '../service/service';
import { Router, ActivatedRoute } from '@angular/router';
import { Ticket } from '../ticket/ticket';
import {
  FormGroup,
  Validators,
  FormControl,
  AbstractControl,
} from '@angular/forms';
@Component({
  selector: 'app-adminticketview',
  templateUrl: './adminticketview.component.html',
  styleUrls: ['./adminticketview.component.css'],
})
export class AdminticketviewComponent implements OnInit {
  ticketForm: FormGroup;
  loading = false;
  submitted = false;
  users: Ticket[];
  user = new Ticket();
  ticketId: string;
  formData = new FormData();
  constructor(
    private _userService: Service,
    private router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {}

  form = new FormGroup({
    comment: new FormControl('', []),
    status: new FormControl('', []),
  });
  ngOnInit(): void {
    this.getAllTicket();
  }

  getAllTicket(): void {
    this.ticketId = this.route.snapshot.params.id;
    this._userService.getTicketByIdonly(this.ticketId).subscribe(
      (userData) => {
        this.user = userData;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  get f() {
    return this.form.controls;
  }

  onSubmit(ticketId: string) {
    if (this.f.status.value !== '') {
      this._userService
        .editTicketStatus(this.ticketId, this.f.status.value)
        .subscribe(
          (userData) => {},
          (error) => {
            console.log(error);
          }
        );
      this.router.navigate(['/adminhomepage']);
    }
  }

  Return(): void {
    this.router.navigate(['/adminhomepage']);
  }

  Logout(): void {
    sessionStorage.removeItem('name');
    this.router.navigate(['login/']);
  }
}
