import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Exam } from '../exam.model';
import { ExamService } from '../exam.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {
  myForm:FormGroup;
  examData:Array<Exam> = [];
  constructor(public form:FormBuilder, public examSer:ExamService) { 
    this.myForm=form.group({});
  }
msg:string="";
total:string="";
Answers:Array<Exam["correctOpt"]> = []
counter:number = 0;
  ngOnInit(): void {
    
    this.examSer.checkAnswer().subscribe(data =>{
      this.examData=data;
      this.examData.forEach(q=> {
        this.myForm.addControl(q.question,this.form.control(""));
        this.examData.forEach(result =>{
            if(result.correctOpt == this.myForm.value){
              this.msg ="Correct!"
              this.counter += 1
          }
          else {
            this.msg = "Incorrect!"
          }
        })
             });  
            });
            
            
            
  }

  submit(){
   
    this.total= "You got " + this.counter + "/10 correct!"
  
      }
      
    

  
}
