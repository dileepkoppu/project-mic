import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { ExamService } from 'app/services/exam.service';


interface examInterface{
    _id:string
    title:string,
    cName:string,
    imgLink:string,
    description:string,
    totalNoOfQ:number
}


@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.css']
})
export class ExamListComponent implements OnInit{
  public loggedIn: boolean = false;
  // public role:Boolean =false;

  records:examInterface[]=[]
  constructor(
    private ExamService:ExamService,
    private router:Router,
    private auth:AuthService){
  }
  ngOnInit(): void {
    this.auth.authStatus.subscribe(value =>{ this.loggedIn = value});
    // this.auth.behaviorRole.subscribe(value => {this.role = value});
    this.ExamService.examList()
                    .subscribe((data)=>{
                      this.records=data.data                      
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

  deleteExam(id:string){    
    this.ExamService.examDelete(id)
                          .subscribe((data)=>{
                            this.records=data.data
                          }
                          ,(error)=>{
                            if (error.error.message) {
                              alert(error.error.message)
                            } else {
                             alert("something went wrong please try again") 
                            }
                            this.router.navigate([''])
                          })

  }

}
