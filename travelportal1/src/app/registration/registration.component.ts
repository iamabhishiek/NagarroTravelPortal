import {Component, OnInit} from '@angular/core';
import {Register} from './regitration';
import { UserService} from '../userservice/userservice';
import { FormGroup,Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first, combineAll } from 'rxjs/operators';
import { ThrowStmt } from '@angular/compiler';
@Component({
    selector: 'app-registration',
    templateUrl:'./registration.component.html',
    styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit{
    loading = false;
    submitted = false;
    userId:string;
    users:Register[];
    user = new Register();
    buttoname : string;
    countries:{}
    constructor(
        private _userService:UserService,
        private router:Router,
        private route:ActivatedRoute){}
   
        form = new FormGroup({
            firstName:new FormControl('', [
              Validators.required,
            ]),
            lastName:new FormControl('', [
                Validators.required,
              ]),
            businessUnit: new FormControl('', [
                Validators.required,
              ]),
              title: new FormControl('', [
                Validators.required,
              ]),
              email: new FormControl('', [
                    Validators.required,
                    emaildomain
                  ]),
             telephone:new FormControl('', [
                Validators.required,
                Validators.maxLength(15)
              
              ]),
            address1:new FormControl('', [
                Validators.required,
              ]),
            address2:new FormControl('', [
              ]),
            city:new FormControl('', [
                Validators.required,
              ]),
            state:new FormControl('', [
                Validators.required,
              ]),
            zip:new FormControl('', [
                Validators.required,
              ]),
            country: new FormControl('', [
                Validators.required,
              ])
           });
        ngOnInit():void{
          this._userService.getCountries()
          .subscribe(
            data=>{
              this.countries=data;
            }
           
          );
        this.route.queryParams
        .subscribe(params=>
            {
               
                this.buttoname='Submit'
                this.userId = this.route.snapshot.params.id;
                if(this.userId!==undefined)
                {
                    this.buttoname='Update'
                    this.getUserById(this.userId);
                }
                
            })
       
    }
    
    get f() { return this.form.controls; }

    onSubmit():void{
      if(this.form.invalid){
        return
      }
        this.submitted = true; 
        this.user.firstName = this.f.firstName.value;
        this.user.lastName = this.f.lastName.value;
        this.user.businessUnit = this.f.businessUnit.value;
        this.user.title = this.f.title.value;
        this.user.email = this.f.email.value;
        this.user.telephone = this.f.telephone.value;
        this.user.address1 = this.f.address1.value;
        this.user.address2 = this.f.address2.value;
        this.user.city = this.f.city.value;
        this.user.state = this.f.state.value;
        this.user.country = this.f.country.value;
        this.user.zip = this.f.zip.value;
        this.addUser();
     
    }

    addUser():void{
        if(this.buttoname==='Submit'){
        this._userService.addUser(this.user)
        .subscribe((response)=>{  
            let resStr = JSON.stringify(response);
            var id =resStr;
            this.router.navigate(['success/'+id]);      
        });
        }
        if(this.buttoname==='Update'){
            this._userService.edit(this.userId,this.user)
        .subscribe((response)=>{  
            let resStr = JSON.stringify(response);
            var id =resStr;
            this.router.navigate(['success/'+id]);
            console.log(response);         
        });
        }

    }

    getUserById(userId:string):void{
        this._userService.getUserById(userId)
        .subscribe((userData)=>{
            this.user=userData;
            this.form.setValue({
            firstName:this.user.firstName,
            lastName:this.user.lastName,
            businessUnit:this.user.businessUnit,
            title:this.user.title,
            email:this.user.email,
            telephone:this.user.telephone,
            address1:this.user.address1,
            address2:this.user.address2,
            city:this.user.city,
            state:this.user.state,
            zip:this.user.zip,
            country:this.user.country
        });     
        },
        (error)=>{
            console.log(error);
        })
    }

}

function emaildomain(control: AbstractControl):{[key:string]:any}| null{
  const email : string = control.value;
  const domain =email.substring(email.lastIndexOf('@')+1);
  if(email==='' ||domain.toLocaleLowerCase() === 'nagarro.com'){
    return null;
  }
  else{
    return{'emaildomain' : true}
  }
}