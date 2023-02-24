import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup,FormControl, Validators } from "@angular/forms";
import { saveAs } from 'file-saver';
import { AuthService } from 'app/services/auth.service';
import { StatisticsPreviousService } from 'app/services/statistics-previous.service';


interface recordInterface{
  id:string,
  firstName:string,
  lastName:string,
  Branch:string,
  passOutYear:string,
  cName:string
}


@Component({
  selector: 'app-statistics-previous',
  templateUrl: './statistics-previous.component.html',
  styleUrls: ['./statistics-previous.component.css']
})
export class StatisticsPreviousComponent {

    public loggedIn: boolean = false;
    role!:boolean|null

    records:recordInterface[]=[]
    Year!:string[]
    Branch!:string[]
    CName!:string[]

    searchForm =new FormGroup({
      passOutYear: new FormControl(''),
      Branch : new FormControl(''),
      cName : new FormControl(''),
    });
    
    fileUplodForm = new FormGroup({
      details : new FormControl(''),
    })
  
    constructor(
      private StatisticsPrevious:StatisticsPreviousService,
      private router:Router,
      private auth:AuthService
      ){
    }
  
    ngOnInit(): void {

      this.auth.authStatus.subscribe(value =>{ 
        this.loggedIn = value
        console.log(value);
      });
      this.auth.behaviorRole.subscribe(value => this.role =value==="superuser");

      this.StatisticsPrevious.StatisticsPreviouslist()
                              .subscribe((data)=>{
                                this.records=data.data
                                console.log(data)
                              },
                              (error)=>{
                                console.log(error);
                                // this.router.navigate([''],{state:{alert:true,success:error.success,message:error.message}})
                              })
      this.StatisticsPrevious.StatisticsPreviousYear()
                              .subscribe((data)=>{
                                this.Year=data.data
                                console.log(data)
                              },
                              (error)=>{
                                console.log(error);
                                // this.router.navigate([''],{state:{alert:true,success:error.success,message:error.message}})
                              })
      this.StatisticsPrevious.StatisticsPreviousCName()
                              .subscribe((data)=>{
                                this.CName=data.data
                                console.log(data)
                              },
                              (error)=>{
                                console.log(error);
                                // this.router.navigate([''],{state:{alert:true,success:error.success,message:error.message}})
                              })
      this.StatisticsPrevious.StatisticsPreviousBranch()
                              .subscribe((data)=>{
                                this.Branch=data.data
                                console.log(data.data)
                                
                              },
                              (error)=>{
                                console.log(error);
                                // this.router.navigate([''],{state:{alert:true,success:error.success,message:error.message}})
                              })
    }
    onSumbit(){
      console.log(this.searchForm.value);
      this.StatisticsPrevious.StatisticsPreviouslistq(this.searchForm.value)
                              .subscribe((data)=>{
                                this.records=data.data
                                console.log(data)
                              },
                              (error)=>{
                                console.log(error);
                                // this.router.navigate([''],{state:{alert:true,success:error.success,message:error.message}})
                              })
    }


    onSumbit1(){
      console.log(this.fileUplodForm.value);
      this.StatisticsPrevious.StatisticsPreviousFileUpload(this.fileUplodForm.value)
                              .subscribe((data)=>{
                                this.records=data.data
                                console.log(data)
                                this.router.navigate(['StatisticsPrevious/'])
                              },
                              (error)=>{
                                console.log(error);
                                // this.router.navigate([''],{state:{alert:true,success:error.success,message:error.message}})
                              })
    }



    file(event:any){
      this.fileUplodForm.patchValue({details:event.target.files[0]})
    }

    onSumbitDownload(){
      console.log(this.searchForm.value);
      
      this.StatisticsPrevious.StatisticsPreviousDownload(this.searchForm.value)
                              .subscribe((response)=>{
                                let blob:any = new Blob([response], { type: 'text/csv; charset=utf-8' });
                                const url = window.URL.createObjectURL(blob);
                                saveAs(blob, 'employees.csv');
                              },
                              (error: any)=>{
                                console.log(error);
                                // this.router.navigate([''],{state:{alert:true,success:error.success,message:error.message}})
                              })
    }

  }
  
