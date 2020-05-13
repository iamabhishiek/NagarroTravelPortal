import { Component, OnInit } from '@angular/core';
import { Ticket } from '../ticket/ticket';
import { Service } from '../service/service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usertickets',
  templateUrl: './usertickets.component.html',
  styleUrls: ['./usertickets.component.css'],
  providers: [Service],
})
export class UserticketsComponent implements OnInit {
  user: Array<any>;
  userId: string;
  totalRecords: number;
  page: number = 1;
  constructor(private service: Service, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.getTicket();
  }
  getTicket() {
    this.userId = this.route.snapshot.params.id;
    this.service.getTicket(this.userId).subscribe((userdata) => {
      this.user = userdata;
      this.totalRecords = this.user.length;
    });
  }
}
