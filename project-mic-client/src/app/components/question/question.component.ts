import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamService } from 'app/services/exam.service';


interface qustionDetailsInterface{
  _id: string,
  question: string,
  options:string[],
  exam_id: string
}


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  qn:string=''
  record :qustionDetailsInterface={
    _id: '',
    question: '',
    options:['1','2','3','4'],
    exam_id: ''
  }

  questionForm= new FormGroup({
    opt : new FormControl('',Validators.required)
  })
  constructor(private exam:ExamService,
    private activated:ActivatedRoute,
    private router : Router){
      this.router.routeReuseStrategy.shouldReuseRoute = function() {
        return false;
    };
    }
  ngOnInit(): void {
    this.qn=localStorage.getItem("qn")||'1'
    this.exam.questionDetails(this.activated.snapshot.params['q_id'])
                                          .subscribe((data)=>{
                                            this.record=data.data
                                            console.log(data.data);
                                            
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
    this.exam.checkAns(this.activated.snapshot.params['q_s'],this.activated.snapshot.params['q_id'],this.questionForm.value)
                                                                            .subscribe((data)=>{
                                                                              if (data.data.q_c) {
                                                                              localStorage.setItem("qn",this.qn+1)
                                                                              this.router.navigate(["/exam-list/",this.activated.snapshot.params['q_id'],this.activated.snapshot.params['q_s'],data.data.q_c])
                                                                              } else {
                                                                                localStorage.removeItem('qn')
                                                                                this.router.navigate(['result',this.activated.snapshot.params['q_s']])
                                                                              }
                                                                            },(error)=>{
                                                                              if (error.error.message) {
                                                                                alert(error.error.message)
                                                                              } else {
                                                                               alert("something went wrong please try again") 
                                                                              }
                                                                              this.router.navigate([''])
                                                                            })
    
  }

}
