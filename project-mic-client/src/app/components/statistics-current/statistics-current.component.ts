import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup,FormControl, Validators } from "@angular/forms";
import { saveAs } from 'file-saver';
import { AuthService } from 'app/services/auth.service';
import { StatisticsCurrentService } from 'app/services/statistics-current.service';

interface recordInterface{
  id:string,
  firstName:string,
  lastName:string,
  Branch:string,
  passOutYear:string,
  cName:string,
  totalRounds:Number,
  currentRound:Number,
  status:boolean
}

@Component({
  selector: 'app-statistics-current',
  templateUrl: './statistics-current.component.html',
  styleUrls: ['./statistics-current.component.css']
})
export class StatisticsCurrentComponent {
  public loggedIn: boolean = false;
  // public  role:Boolean= false;

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
      private StatisticsCurrent:StatisticsCurrentService,
      private router:Router,
      private auth:AuthService
      ){
    }
    ngOnInit(): void {

      this.auth.authStatus.subscribe(value =>{ 
        this.loggedIn = value});
      // this.auth.behaviorRole.subscribe(value => this.role =value);

      this.StatisticsCurrent.StatisticsCurrentlist()
                              .subscribe((data)=>{
                                this.records=data.data
                                console.log(data)
                              },
                              (error)=>{
                                if (error.error.message) {
                                  alert(error.error.message)
                                } else {
                                 alert("something went wrong please try again") 
                                }
                                this.router.navigate([''])
                              })
      this.StatisticsCurrent.StatisticsCurrentYear()
                              .subscribe((data)=>{
                                this.Year=data.data
                                console.log(data)
                              },
                              (error)=>{
                                if (error.error.message) {
                                  alert(error.error.message)
                                } else {
                                 alert("something went wrong please try again") 
                                }
                                this.router.navigate([''])
                              })
      this.StatisticsCurrent.StatisticsCurrentCName()
                              .subscribe((data)=>{
                                this.CName=data.data
                                console.log(data)
                              },
                              (error)=>{
                                if (error.error.message) {
                                  alert(error.error.message)
                                } else {
                                 alert("something went wrong please try again") 
                                }
                                this.router.navigate([''])
                              })
      this.StatisticsCurrent.StatisticsCurrentBranch()
                              .subscribe((data)=>{
                                this.Branch=data.data
                                console.log(data.data)
                                
                              },
                              (error)=>{
                                if (error.error.message) {
                                  alert(error.error.message)
                                } else {
                                 alert("something went wrong please try again") 
                                }
                                this.router.navigate([''])
                              })
    }
    onSumbit(){
      console.log(this.searchForm.value);
      this.StatisticsCurrent.StatisticsCurrentlistq(this.searchForm.value)
                              .subscribe((data)=>{
                                this.records=data.data
                                console.log(data)
                              },
                              (error)=>{
                                if (error.error.message) {
                                  alert(error.error.message)
                                } else {
                                 alert("something went wrong please try again") 
                                }
                                this.router.navigate([''])
                              })
    }


    onSumbit1(){
      console.log(this.fileUplodForm.value);
      this.StatisticsCurrent.StatisticsCurrentFileUpload(this.fileUplodForm.value)
                              .subscribe((data)=>{
                                this.records=data.data
                                console.log(data)
                                this.router.navigate(['StatisticsCurrent/'])
                              },
                              (error)=>{
                                if (error.error.message) {
                                  alert(error.error.message)
                                } else {
                                 alert("something went wrong please try again") 
                                }
                                this.router.navigate([''])
                              })

}
file(event:any){
  this.fileUplodForm.patchValue({details:event.target.files[0]})
}
onSumbitDownload(){
  console.log(this.searchForm.value);
  
  this.StatisticsCurrent.StatisticsCurrentDownload(this.searchForm.value)
                          .subscribe((response)=>{
                            let blob:any = new Blob([response], { type: 'text/csv; charset=utf-8' });
                            const url = window.URL.createObjectURL(blob);
                            saveAs(blob, 'employees.csv');
                          
                            // this.router.navigate(['StatisticsPrevious'])
                          },
                          (error: any)=>{
                            console.log(error);
                            // this.router.navigate([''],{state:{alert:true,success:error.success,message:error.message}})
                          })
}

}
