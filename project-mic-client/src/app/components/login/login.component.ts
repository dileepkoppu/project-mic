import { Component,OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";


import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  loginForm =new FormGroup({
    id: new FormControl('',Validators.required),
    password : new FormControl('',Validators.required)
  });
  
  // alert :boolean =false
  // success :boolean =false
  // message : string =''
  constructor(private auth : AuthService,private router:Router) {
  //   this.alert=this.router.getCurrentNavigation()?.extras.state?.alert
  //   this.success=this.router.getCurrentNavigation()?.extras.state?.success
  //   this.message=this.router.getCurrentNavigation()?.extras.state?.message
   }
  ngOnInit(): void {
  }
  onSumbit(){
    console.log(this.loginForm.value);
    
    this.auth.login(this.loginForm.value)
                                      .subscribe((data)=>{
                                        this.auth.setLocalStorage(data.data)
                                        this.auth.changeAuthStatus(this.auth.isLoggedIn())
                                        // this.auth.changeDetails(data.data.username,data.data.role)
                                        this.router.navigate([''])
                                      },
                                      (error)=>{
                                        if (error.error.message) {
                                          alert(error.error.message)
                                        } else {
                                         alert("something went wrong please try again") 
                                        }
                                        this.router.navigate([''])
                                      }
                                      )
  } 

}