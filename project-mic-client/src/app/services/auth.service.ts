import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Router } from "@angular/router";
import { catchError } from 'rxjs/operators';

interface loginInterface{
  success:boolean,
  data:{
    token:string,
    expiresIn:Date,
    username:string,
    role:string
  }
}

interface resetpasswordInterface{
  success:boolean,
  message:string
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient,private router:Router) { }

  setLocalStorage(responseObj:any) {
    localStorage.setItem('id_token', responseObj.token);
    localStorage.setItem('role',responseObj.role);
    localStorage.setItem("expires_at", responseObj.expiresIn);
  } 

  login(data:any):Observable<loginInterface>{
    
    return this.http.post<loginInterface>(`http://localhost:9000/login`,data)
                                        .pipe(catchError((error)=>{return throwError(error)}))
  }

  resetpassword(data:any):Observable<resetpasswordInterface>{
    return this.http.post<resetpasswordInterface>(`resetpassword`,data)
                                              .pipe(catchError((error)=>{return throwError(error)}))
  }
  conformresetPassword(data:any,authToken:string,id:string):Observable<resetpasswordInterface>{
    return this.http.patch<resetpasswordInterface>(`resetpassword/${authToken}/${id}`,data) 
                                                    .pipe(catchError((error)=>{return throwError(error)}))
  }

  logout(){
    localStorage.clear()
    this.changeAuthStatus(this.isLoggedIn());
    // this.changeDetails()
    this.router.navigate([''])
  }


  isLoggedIn():boolean {
    let role=localStorage.getItem('role')
    if (localStorage.getItem('id_token') && role && localStorage.getItem("expires_at")) {
      let isRoleValid=role==="superuser" 
      return Date.now()<this.getExpiration()&&(isRoleValid)
    } else {
      return false
    }
  }


  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    if (expiration) {
        return expiration;
    } else {
        return Date.now();
    }
  }

  // roleCheck():Boolean {
  //   const role = localStorage.getItem('role');
  //   return role==='superuser'
  // }



  private loggedIn = new BehaviorSubject <boolean>(this.isLoggedIn());
  // private _role = new BehaviorSubject <Boolean>(this.roleCheck());
  authStatus = this.loggedIn.asObservable();
  // behaviorRole = this._role.asObservable();
  changeAuthStatus(value : boolean){
         this.loggedIn.next(value)
  }
  // changeDetails(role:Boolean=""){
  //   this._role.next(role)
  // }
}
