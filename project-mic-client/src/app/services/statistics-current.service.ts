import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { Observable,throwError } from 'rxjs';
import {environment} from 'environments/environment'



interface StatisticsCurrentInterface{
  success:Boolean,
  data:{
    id:string,
    firstName:string,
    lastName:string,
    Branch:string,
    passOutYear:string,
    cName:string,
    totalRounds:Number,
    currentRound:Number,
    status:boolean
  }[]
}

interface StatisticsCurrentDataInterface{
  success:Boolean,
  data:string[]
}

@Injectable({
  providedIn: 'root'
})
export class StatisticsCurrentService {

  constructor(private http:HttpClient) { }
  StatisticsCurrentlist():Observable<StatisticsCurrentInterface>{
    return this.http.get<StatisticsCurrentInterface>(`${environment.API_URL}studentC-List`)
                       .pipe(catchError((error)=>{return throwError(error)}))
  }
  StatisticsCurrentlistq(query: Partial<{ passOutYear: string | null; Branch: string | null; cName: string | null; }>):Observable<StatisticsCurrentInterface>{
    let passOutYear=query['passOutYear']
    let cName=query['cName']
    let Branch=query['Branch']

    return this.http.get<StatisticsCurrentInterface>(`${environment.API_URL}studentC-List?passOutYear=${passOutYear}&cName=${cName}&Branch=${Branch}`)
                       .pipe(catchError((error)=>{return throwError(error)}))
  }
  StatisticsCurrentYear():Observable<StatisticsCurrentDataInterface>{
    return this.http.get<StatisticsCurrentDataInterface>(`${environment.API_URL}studentC-List/distinctYear`)
                       .pipe(catchError((error)=>{return throwError(error)}))
  }  
  StatisticsCurrentBranch():Observable<StatisticsCurrentDataInterface>{
    return this.http.get<StatisticsCurrentDataInterface>(`${environment.API_URL}studentC-List/distinctBranch`)
                       .pipe(catchError((error)=>{return throwError(error)}))
  }
  StatisticsCurrentCName():Observable<StatisticsCurrentDataInterface>{
    return this.http.get<StatisticsCurrentDataInterface>(`${environment.API_URL}studentC-List/distinctcName`)
                       .pipe(catchError((error)=>{return throwError(error)}))
  }
  StatisticsCurrentFileUpload(data: { [x: string]: any; }):Observable<StatisticsCurrentInterface>{
    const formData = new FormData();
    for ( const key of Object.keys(data) ) {
    const value = data[key];
    formData.append(key, value);
    }
    return this.http.post<StatisticsCurrentInterface>(`${environment.API_URL}studentC-create`,formData)
                                      .pipe(catchError((error)=>{return throwError(error)}))
  }
  StatisticsCurrentDownload(query: Partial<{ passOutYear: string | null; Branch: string | null; cName: string | null; }>){
    let passOutYear=query['passOutYear']
    let cName=query['cName']
    let Branch=query['Branch']

    return this.http.get(`${environment.API_URL}studentC-download?passOutYear=${passOutYear}&cName=${cName}&Branch=${Branch}`,{responseType: 'blob'})
                       .pipe(catchError((error)=>{return throwError(error)}))
  }
}
