import { Component, OnInit } from '@angular/core';
import { Ticket } from './ticket'
import { UserService} from '../userservice/userservice';
import { FormGroup, FormControl, FormBuilder,Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-ticketraised',
  templateUrl: './ticketraised.component.html',
  styleUrls: ['./ticketraised.component.css']
})
export class TicketraisedComponent implements OnInit {

  ticketForm:FormGroup;
    loading = false;
    submitted = false;
    userId: string;
    ticketId:string;
    users:Ticket[];
    user = new Ticket();
    buttoname : string;
    constructor(
        private _userService:UserService,
        private formBuilder:FormBuilder,
        private router:Router,
        private route:ActivatedRoute){}

        
          // this.getUsers();
           form =  new FormGroup({
                
               additional:new FormControl('',[Validators.required]),
               city:new FormControl('',[Validators.required]),
               enddate:new FormControl('',[Validators.required]),
               expectduration: new FormControl('',[]),
               expenseborn: new FormControl('',[Validators.required]),
               fromcity:new FormControl('',[Validators.required]),
               passportnumber:new FormControl('',[Validators.required]),
               priority:new FormControl('',[Validators.required]),
               projectname: new FormControl('',[Validators.required]),
               requestype: new FormControl('',[Validators.required]),
               date:new FormControl('',[Validators.required]),
               travelapprover:new FormControl('',[]),
               upperbound: new FormControl('',[]),
           })
           ngOnInit():void{
           this.route.queryParams
            .subscribe(params=>
            {
               
                this.buttoname='Submit'
                this.ticketId = this.route.snapshot.params.ticketId;
                this.userId = this.route.snapshot.params.id;
                if(this.ticketId!==undefined)
                {
                    this.buttoname='Update'
                    this.getUserById(this.userId,this.ticketId);
                }
                
            })
          }


    get f() { return this.form.controls; }

    onSubmit():void{
        this.submitted = true; 

        //stop if form is invaid     
        if(this.form.invalid){
            return;
        }
            
        this.user.additional = this.f.additional.value;
        this.user.city = this.f.city.value;
        this.user.endate = this.f.enddate.value;
        this.user.expectduration = this.f.expectduration.value;
        this.user.expenseborn = this.f.expenseborn.value;
        this.user.fromcity = this.f.fromcity.value;
        this.user.passportnumber = this.f.passportnumber.value;
        this.user.priority = this.f.priority .value;
        this.user.projectname = this.f.projectname .value;
        this.user.requestype= this.f.requestype.value;
        this.user.startdate = this.f.date.value;
        this.user.travelapprover = this.f.travelapprover.value;
        this.user.upperbound = this.f.upperbound.value;
        this.addUser();
     
    }


    addUser():void{
      if(this.buttoname==='Submit'){
        this.userId = this.route.snapshot.params.id;
      this._userService.addTicket(this.userId,this.user)
      .subscribe((response)=>{  
          let resStr = JSON.stringify(response);
          console.log(resStr)
          var id =resStr;
          this.router.navigate(['successticket/'+this.userId+'/'+id]);      
      });
    }
    if(this.buttoname==='Update'){
      if(this.user.status==='Approved')
     { this.user.status= 'ReSubmitted'
      this._userService.editicket(this.userId,this.ticketId,this.user)
  .subscribe((response)=>{  
      this.router.navigate(['successticket/'+this.userId+'/'+this.ticketId]);
      console.log(response);         
  });
    }
    else
    { 
    this._userService.editicket(this.userId,this.ticketId,this.user)
.subscribe((response)=>{  
    this.router.navigate(['successticket/'+this.userId+'/'+this.ticketId]);
    console.log(response);         
});
  }
  }
  }

  getUserById(userId:string,ticketId:string):void{
    this._userService.getTicketById(userId,ticketId)
    .subscribe((userData)=>{
        this.user=userData;
       // console.log(userData);
        this.form.setValue({
         additional: this.user.additional,
          city: this.user.city ,
         enddate: this.user.endate,
         expectduration: this.user.expectduration ,
         expenseborn: this.user.expenseborn,
          fromcity: this.user.fromcity ,
         passportnumber: this.user.passportnumber ,
         priority: this.user.priority ,
         projectname: this.user.projectname ,
         requestype: this.user.requestype,
         date: this.user.startdate,
         travelapprover: this.user.travelapprover ,
         upperbound: this.user.upperbound 
    });     
    },
    (error)=>{
        console.log(error);
    })
  }

  Logout():void{
    localStorage.removeItem('auth')
    this.router.navigate(['login/user']);
  }
}
