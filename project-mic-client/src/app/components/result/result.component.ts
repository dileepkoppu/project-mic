import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamService } from 'app/services/exam.service';


interface resultDetailsInterface{
  _id: string,
  exam_id: string,
  score: number,
  totalNoOfQ: number
}
@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  record:resultDetailsInterface={
    _id: '',
    exam_id: '',
    score: 1,
    totalNoOfQ: 1
  }

  constructor(private exam:ExamService,
    private activated: ActivatedRoute,
    private router:Router){}

  ngOnInit(): void {
   this.exam.resultDetails(this.activated.snapshot.params['exam_session'])
                                                .subscribe((data)=>{
                                                  this.record=data.data
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
