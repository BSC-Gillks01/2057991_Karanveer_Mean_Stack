import { createUrlResolverWithoutPackagePrefix } from '@angular/compiler';
import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginRef = new FormGroup({
    user:new FormControl("", [Validators.required]),
    pass:new FormControl("", [Validators.required])
  });

  registerRef = new FormGroup({
    fname:new FormControl("", [Validators.required]),
    lname:new FormControl("", [Validators.required]),
    user:new FormControl("", [Validators.required]),
    pass:new FormControl("", [Validators.required])
  });

  portfolioRef = new FormGroup({
    contactName:new FormControl("",[Validators.required]),
    phoneNumber:new FormControl("",Validators.required)
  })

  msg:string = "";
  f1:boolean = true;
  f2:boolean = false;
  flag:boolean = false;

  user:any = "";
  pass:any = "";
  name:string ="";
  contactName:any ="";
  phoneNumber:any = "";
  contacts:any = "";

  boolChange(){
    this.f1 = false;
    this.f2 = true;
    }

  boolBack(){
    this.f1 = true;
    this.f2 = false;
  }

  toggle(){
    if(this.flag){
      this.flag =false;
    } else {
      this.flag = true;
      this.f1 = false;
      this.f2 = false;
    }
  }
  constructor() {
    
  }

  ngOnInit(): void {
  }
  registerUser(userRef:any, passRef:any){
    this.user = userRef.value;
    this.name = this.user;
    this.pass = passRef.value;
    this.msg = "Succesfully Registered! Please login!"
  }

  checkUser(){
    let login = this.loginRef.value
    if (login.user == this.user && login.pass == this.pass){
      this.toggle()
    } else {
      this.msg = "Please register"
    }
  }

  contactDeets(contactRef:any, phoneRef:any){
    this.contactName = contactRef.value
    this.phoneNumber = phoneRef.value
    
  }

  displayDeets(){
    this.contacts = this.portfolioRef.value;   
  }
}
