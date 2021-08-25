import { AstMemoryEfficientTransformer } from '@angular/compiler';
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
  selectedArr:Array<string> =[];
  correctAnswers:Array<string> = [];
  radioPick:any="";
  correctArr:Array<string> = ["Mohammed Ali", "blue", "6","China", "Germany", "Baseball", "8", "Clownfish", "Pride", "Saturn"];
  constructor(public form:FormBuilder, public examSer:ExamService) { 
    this.myForm=form.group({});
  }
msg:string="";
badMsg:string="";
total:string="";
counter:number = 0;

  ngOnInit(): void {
    this.examSer.checkAnswer().subscribe(data =>{
      this.examData=data;
      this.examData.forEach(q=> {
        this.myForm.addControl(q.question,this.form.control("")); 
       
          
             });  
            });                    
  }
submit(){  
    Object.keys(this.myForm.value).forEach(q=>this.selectedArr.push(this.myForm.value[q]))
  let len = this.correctArr.length
  for(let i = 0; i < len; i++){
    if(this.selectedArr[i] == this.examData[i].correctOpt){
      this.counter += 1;    
    }  
    else {
    }  
  }
  this.total = "You got " + this.counter + " correct!"
}
}
