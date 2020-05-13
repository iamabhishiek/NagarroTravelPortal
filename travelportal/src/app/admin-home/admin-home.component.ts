import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Service } from '../service/service';
import { Ticket } from '../ticket/ticket';

import { MatTableDataSource } from '@angular/material/table';
import { MatSortable, MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})
export class AdminHomeComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  ticketForm: FormGroup;
  loading = false;
  submitted = false;
  users: Ticket[];
  user;
  fileToUpload: File = null;
  ticketId: string;
  formData = new FormData();
  data: File;
  Columns = ['ticketid', 'priority', 'submittedDate', 'status'];
  constructor(
    private _userService: Service,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {}

  form = new FormGroup({
    comment: new FormControl('', []),
    file: new FormControl([null]),
  });
  ngOnInit(): void {
    this.getAllTicket();
  }

  getAllTicket(): void {
    this._userService.getAllTicket().subscribe(
      (userData) => {
        this.user = new MatTableDataSource(userData);
        this.user.sort = this.sort;
        console.log(userData);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  get f() {
    return this.form.controls;
  }

  onFileChange(event) {
    let reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.data = file;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.form.patchValue({
          file: reader.result,
        });
        console.log(file);
        this.cd.markForCheck();
      };
    }
  }

  onSubmit(ticketId: string) {
    this.formData.append('file', this.data);
    this.formData.append('comment', this.f.comment.value);
  }

  link(j: string) {
    this.router.navigate(['/adminticketview/' + j]);
  }

  Logout(): void {
    localStorage.removeItem('auth');
    this.router.navigate(['login/user']);
  }
}
