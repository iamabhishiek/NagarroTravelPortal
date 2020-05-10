import { Component, OnInit } from '@angular/core';
import { Ticket } from '../ticketraised/ticket'
import { UserService} from '../userservice/userservice';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-viewtickets',
  templateUrl: './viewtickets.component.html',
  styleUrls: ['./viewtickets.component.css'],
  providers:[UserService]
})
export class ViewticketsComponent implements OnInit {

  user:Array<any>;
  userId :string;
  totalRecords:number;
  page:number=1;
  constructor(
    private _userService:UserService,
    private formBuilder:FormBuilder,
    private router:Router,
    private route:ActivatedRoute){}

  ngOnInit(): void {
    this.getTicket();
  }

  getTicket(){
    this.userId = this.route.snapshot.params.id;
    this._userService.getTicket(this.userId)
    .subscribe(data=>
      {
        console.log(data)
        this.user=data;
        this.totalRecords = this.user.length
      })
    
  }
link(j:string){
  let url:string = "localhost:4200/viewticket/"+this.userId+"/"+j;
  window.open(url);
 }
 Logout():void{
  localStorage.removeItem('auth')
  this.router.navigate(['login/user']);
}

}
