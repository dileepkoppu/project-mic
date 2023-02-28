import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
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
  selector: 'app-exam-start',
  templateUrl: './exam-start.component.html',
  styleUrls: ['./exam-start.component.css']
})
export class ExamStartComponent implements OnInit{
  record!:examInterface
  constructor(private exam:ExamService,
    private activatedRoute:ActivatedRoute,
    private router : Router){}
  startExamForm = new FormGroup({
    name :new FormControl('',Validators.required)
  })
  ngOnInit(): void {
   this.exam.examDetails(this.activatedRoute.snapshot.params['id'])
                      .subscribe((data)=>{
                        this.record=data.data
                        console.log(this.record);
                      },(error)=>{
                        if (error.error.message) {
                          alert(error.error.message)
                        } else {
                         alert("something went wrong please try again") 
                        }
                        this.router.navigate([''])
                      }) 
  }

  onSubmit(){
    this.exam.startExam(this.activatedRoute.snapshot.params['id'],this.startExamForm.value)
                                                                  .subscribe((data)=>{
                                                                    localStorage.setItem("qn","1")
                                                                    this.router.navigate(["/exam-list/",this.activatedRoute.snapshot.params['id'],data.data['id'],data.data['q_c']])
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

}
