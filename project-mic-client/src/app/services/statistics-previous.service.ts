import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { Observable,throwError } from 'rxjs';
import {environment} from 'environments/environment'




interface StatisticsPreviousInterface{
  success:Boolean,
  data:{
    id:string,
    firstName:string,
    lastName:string,
    Branch:string,
    passOutYear:string,
    cName:string
  }[]
}

interface StatisticsPreviousDataInterface{
  success:Boolean,
  data:string[]
}

@Injectable({
  providedIn: 'root'
})
export class StatisticsPreviousService {

  constructor(private http:HttpClient) { }
  StatisticsPreviouslist():Observable<StatisticsPreviousInterface>{
    return this.http.get<StatisticsPreviousInterface>(`${environment.API_URL}studentP-List`)
                       .pipe(catchError((error)=>{return throwError(error)}))
  }
  StatisticsPreviouslistq(query: Partial<{ passOutYear: string | null; Branch: string | null; cName: string | null; }>):Observable<StatisticsPreviousInterface>{
    // passOutYear=2022&cName=TCS&Branch=ECE/
    let passOutYear=query['passOutYear']
    let cName=query['cName']
    let Branch=query['Branch']

    return this.http.get<StatisticsPreviousInterface>(`${environment.API_URL}studentP-List?passOutYear=${passOutYear}&cName=${cName}&Branch=${Branch}`)
                       .pipe(catchError((error)=>{return throwError(error)}))
  }
  StatisticsPreviousYear():Observable<StatisticsPreviousDataInterface>{
    return this.http.get<StatisticsPreviousDataInterface>(`${environment.API_URL}studentP-List/distinctYear`)
                       .pipe(catchError((error)=>{return throwError(error)}))
  }  
  StatisticsPreviousBranch():Observable<StatisticsPreviousDataInterface>{
    return this.http.get<StatisticsPreviousDataInterface>(`${environment.API_URL}studentP-List/distinctBranch`)
                       .pipe(catchError((error)=>{return throwError(error)}))
  }
  StatisticsPreviousCName():Observable<StatisticsPreviousDataInterface>{
    return this.http.get<StatisticsPreviousDataInterface>(`${environment.API_URL}studentP-List/distinctcName`)
                       .pipe(catchError((error)=>{return throwError(error)}))
  }
  StatisticsPreviousFileUpload(data: { [x: string]: any; }):Observable<StatisticsPreviousInterface>{
    const formData = new FormData();
    for ( const key of Object.keys(data) ) {
    const value = data[key];
    formData.append(key, value);
    }
    return this.http.post<StatisticsPreviousInterface>(`${environment.API_URL}studentP-create`,formData)
                                      .pipe(catchError((error)=>{return throwError(error)}))
  }
  StatisticsPreviousDownload(query: Partial<{ passOutYear: string | null; Branch: string | null; cName: string | null; }>){
    // passOutYear=2022&cName=TCS&Branch=ECE/
    let passOutYear=query['passOutYear']
    let cName=query['cName']
    let Branch=query['Branch']

    return this.http.get(`${environment.API_URL}studentP-download?passOutYear=${passOutYear}&cName=${cName}&Branch=${Branch}`,{responseType: 'blob'})
                       .pipe(catchError((error)=>{return throwError(error)}))
  }
}
