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

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})
export class AdminHomeComponent implements OnInit {
  loading = false;
  submitted = false;
  ticketForm: FormGroup;
  users: Ticket[];
  user = new Ticket();
  fileToUpload: File = null;
  ticketId: string;
  form: FormGroup;
  formData = new FormData();
  data: File;
  constructor(
    private _userService: Service,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
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
    this.getAllTicket();
  }
  onChange(event) {
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

  onClick(ticketId: string) {
    // this.router.navigateByUrl('alticket');
    this.formData.append('file', this.data);
    this.formData.append('ticketId', ticketId);
    this.fileUpload();
  }

  getAllTicket(): void {
    this._userService.getAllTicket().subscribe(
      (userData) => {
        this.user = userData;
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

  fileUpload() {}
}
