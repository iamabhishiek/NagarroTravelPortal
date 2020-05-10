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
  ticketForm: FormGroup;
  loading = false;
  submitted = false;
  users: Ticket[];
  user = new Ticket();
  fileToUpload: File = null;
  ticketId: string;
  formData = new FormData();
  data: File;
  constructor(
    private _userService: Service,
    private router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {}

  form = new FormGroup({
    comment: new FormControl('', []),
    file: new FormControl([null]),
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
        this.cd.markForCheck();
      };
    }
  }

  onSubmit(ticketId: string) {
    if (this.data === undefined && this.f.status.value === '') {
      alert(' No Value');
    }
    if (this.data !== undefined) {
      this.formData.append('file', this.data);
      this.formData.append('comment', this.f.comment.value);
      this.fileUpload(ticketId);
    }
    console.log(this.f.status.value);

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

  fileUpload(ticketId: string) {
    this._userService.postFile(this.formData, ticketId).subscribe((message) => {
      console.log(message);
      this.router.navigate(['/adminhomepage']),
        (error) => {
          console.log(error);
        };
    });
  }

  Return(): void {
    this.router.navigate(['/adminhomepage']);
  }

  Logout(): void {
    localStorage.removeItem('auth');
    this.router.navigate(['login/user']);
  }
}
