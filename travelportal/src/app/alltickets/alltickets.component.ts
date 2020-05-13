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
  selector: 'app-alltickets',
  templateUrl: './alltickets.component.html',
  styleUrls: ['./alltickets.component.css'],
})
export class AllticketsComponent implements OnInit {
  ngOnInit(): void {}
}
