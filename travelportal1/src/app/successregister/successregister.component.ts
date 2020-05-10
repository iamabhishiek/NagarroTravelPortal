import { Component, OnInit } from '@angular/core';
import {UserService} from '../userservice/userservice';
import { Register } from '../registration/regitration';
import { Router, ActivatedRoute } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-successregister',
  templateUrl: './successregister.component.html',
  styleUrls: ['./successregister.component.css']
})
export class SuccessregisterComponent implements OnInit {

  registerForm:FormGroup;
    loading = false;
    submitted = false;
    userId:string;
    users:Register[];
    user = new Register();
  constructor(
    private _userService:UserService,
    private formBuilder:FormBuilder,
    private router:Router,
    private route:ActivatedRoute){}

    ngOnInit():void{
      // this.getUsers();
       this.registerForm = this.formBuilder.group({
           firstName:['',Validators.required],
           lastName: ["",Validators.required],
           businessunit: ["",Validators.required],
           title: ["",Validators.required],
           email: ["",[Validators.required,Validators.email]],
           telephone: ["",[Validators.required, Validators.maxLength(15)]],
           address1: ["",Validators.required],
           address2: [""],
           city: ["",Validators.required],
           state: ["",Validators.required],
           zip: ["",Validators.required],
           country: ["",Validators.required]
       })
       this.route.queryParams
       .subscribe(params=>
           {
               this.userId = this.route.snapshot.params.id;
               if(this.userId!==undefined)
               {
                   this.getUserById(this.userId);
               }
           })
      
   }
   
   getUserById(userId:string):void{
    this._userService.getUserById(userId)
    .subscribe((userData)=>{
        this.user=userData;  
    },
    (error)=>{
        console.log(error);
    })
}
Return():void{
      this.router.navigate(['login/user']);
}
Edit():void{
  this.userId = this.route.snapshot.params.id;
               if(this.userId!==undefined)
               {
            this.router.navigate(['register/'+this.userId]);
               }
}

print(): void {
  let printContents, popupWin;
  printContents = document.getElementById('print-section').innerHTML;
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
    </html>`
  );
  popupWin.document.close();
}
}
