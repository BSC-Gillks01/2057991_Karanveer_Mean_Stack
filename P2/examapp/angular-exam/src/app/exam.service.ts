import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Exam } from './exam.model';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ExamService {

  
  constructor(public http:HttpClient) { }
  
  checkAnswer():Observable<Exam[]>{
    return this.http.get<Exam[]>("/assets/exam.json");
  };


}
