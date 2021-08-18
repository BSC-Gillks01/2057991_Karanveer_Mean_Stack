import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  todoRef = new FormGroup({
    id:new FormControl("", [Validators.required]),
    name:new FormControl("", [Validators.required]),
    task:new FormControl("", [Validators.required]),
    deadline:new FormControl("", [Validators.required])
  })

  taskArr:any = [];
  
  constructor() { }

  ngOnInit(): void {
  }

    addTask(todoRef:NgForm){
      let newTask = todoRef.value;
      this.taskArr.push(newTask)
      todoRef.reset()
    }
  }
