import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { Observable,throwError } from 'rxjs';
import {environment} from 'environments/environment'

interface examInterface{
  success:Boolean,
  data:{
    _id:string,
    title:string,
    cName:string,
    imgLink:string,
    description:string,
    totalNoOfQ:number
  }[]
}

interface examDetailsInterface{
  success:Boolean,
  data:{
    _id:string,
    title:string,
    cName:string,
    imgLink:string,
    description:string,
    totalNoOfQ:number
  }
}

interface startExamInterface{
  success:Boolean,
  data:{
    id:string,
    q_c:string,
    q_n:string,
  }
}
interface qustionDetailsInterface{
  success:Boolean,
  data:{
    _id: string,
    question: string,
    options:string[],
    exam_id: string
  }
}

interface resultDetailsInterface{
  success:Boolean,
  "data": {
    _id: string,
    exam_id: string,
    score: number,
    totalNoOfQ: number
  }
}


@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor(private http:HttpClient) { }

  examList():Observable<examInterface>{
    return this.http.get<examInterface>(`${environment.API_URL}exam-List`)
                       .pipe(catchError((error)=>{return throwError(error)}))
  }
  
  examDelete(id:string):Observable<examInterface>{
    return this.http.delete<examInterface>(`${environment.API_URL}exam-delete/${id}`)
    .pipe(catchError((error)=>{return throwError(error)}))
  }
  examDetails(id:string):Observable<examDetailsInterface>{
    return this.http.get<examDetailsInterface>(`${environment.API_URL}exam-details/${id}`)
                       .pipe(catchError((error)=>{return throwError(error)}))
  }
  createQuestion(id:string,data:any):Observable<examDetailsInterface>{
    return this.http.post<examDetailsInterface>(`${environment.API_URL}question-create/${id}`,data)
                       .pipe(catchError((error)=>{return throwError(error)}))
  }

  createExam(data:any):Observable<examDetailsInterface>{
    return this.http.post<examDetailsInterface>(`${environment.API_URL}exam-create`,data)
                       .pipe(catchError((error)=>{return throwError(error)}))
  }
  startExam(id:string,data:any):Observable<startExamInterface>{
    return this.http.post<startExamInterface>(`${environment.API_URL}${id}/exam-start`,data)
                       .pipe(catchError((error)=>{return throwError(error)}))
  }
  checkAns(e_s:string,q_c:string,data:any):Observable<startExamInterface>{
    return this.http.post<startExamInterface>(`${environment.API_URL}check-ans/${e_s}/${q_c}`,data)
                       .pipe(catchError((error)=>{return throwError(error)}))
  }
  questionDetails(q_c:string):Observable<qustionDetailsInterface>{
    return this.http.get<qustionDetailsInterface>(`${environment.API_URL}question-details/${q_c}`)
                       .pipe(catchError((error)=>{return throwError(error)}))
  }
  resultDetails(exam_session:string):Observable<resultDetailsInterface>{
    return this.http.get<resultDetailsInterface>(`${environment.API_URL}resultExam/${exam_session}`)
                       .pipe(catchError((error)=>{return throwError(error)}))
  }
}
