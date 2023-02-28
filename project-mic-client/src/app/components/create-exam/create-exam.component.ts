import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamService } from 'app/services/exam.service';

@Component({
  selector: 'app-create-exam',
  templateUrl: './create-exam.component.html',
  styleUrls: ['./create-exam.component.css']
})
export class CreateExamComponent implements OnInit {
  createExamForm =new FormGroup({
    title:new FormControl('',Validators.required),
    cName:new FormControl('',Validators.required),
    imgLink:new FormControl('',Validators.required),
    description:new FormControl('',Validators.required),
    totalNoOfQ:new FormControl('',Validators.required)
  });

  constructor(
    private exam:ExamService,
    private router:Router,
    private activatedRoute:ActivatedRoute){}
  ngOnInit(): void { }
  onSubmit(){
    console.log(this.activatedRoute.snapshot.params['id'],this.createExamForm.value);
    this.exam.createExam(this.createExamForm.value)
                                            .subscribe((data)=>{
                                              this.router.navigate(['exam-list'])
                                              if (data.success) {
                                                alert("Exam successfully created") 
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
