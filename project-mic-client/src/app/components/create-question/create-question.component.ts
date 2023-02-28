import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { ExamService } from 'app/services/exam.service';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent implements OnInit{
  createQuestionForm =new FormGroup({
    question:new FormControl('',Validators.required),
    opt1:new FormControl('',Validators.required),
    opt2:new FormControl('',Validators.required),
    opt3:new FormControl('',Validators.required),
    opt4:new FormControl('',Validators.required),
    Ans:new FormControl('',Validators.required)
  });
  constructor(
    private auth:AuthService,
    private exam:ExamService,
    private router:Router,
    private activatedRoute:ActivatedRoute){}
  ngOnInit(): void { }
  onSubmit(){
    console.log(this.activatedRoute.snapshot.params['id'],this.createQuestionForm.value);
    this.exam.createQuestion(this.activatedRoute.snapshot.params['id'],this.createQuestionForm.value)
                                            .subscribe((data)=>{
                                              this.router.navigate(['exam-list'])
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
