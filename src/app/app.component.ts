import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Todo } from './todo';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'csf_workshop_d3_todo';
  form: FormGroup;
  tomorrow = new Date();
  todosValues: Todo[] = [];
  priorities = ["Low","Medium","High"];
  index!: number;

  taskFormControl = new FormControl('',[Validators.required]);
  priorityFormControl = new FormControl('',[Validators.required]);
  dueDateFormControl = new FormControl('',[Validators.required]);

// put the formbuilder in the constructor when the form is to load once only
  constructor(private fb: FormBuilder) {
    this.tomorrow.setDate(this.tomorrow.getDate()+1);
    this.form = this.fb.group({
      task: this.taskFormControl,
      priority: this.priorityFormControl,
      dueDate: this.dueDateFormControl
    })
  }
  addTodo() {
    console.log("Add Todo");
    let taskId = uuidv4();
    let singleTodo = new Todo(
      this.form.value.task,
      this.form.value.priority,
      this.form.value.dueDate,
      taskId,
      false
    );
    this.todosValues.push(singleTodo);
    this.taskFormControl.reset();
    this.priorityFormControl.reset();
    this.dueDateFormControl.reset();
    localStorage.setItem(taskId, JSON.stringify(singleTodo));
  }

  removeTodo(addedTask : any) {
    console.log('delete Todo');
    let index = this.todosValues.indexOf(addedTask);
    let singleTodoDelete = this.todosValues.splice(index,1);

  }

  editTodo(taskIndex: any) {
    console.log('edit Todo');
    let singleTodoEdit = this.todosValues[taskIndex];
    this.form.setValue({
      task: singleTodoEdit.task,
      priority: singleTodoEdit.priority,
      dueDate: singleTodoEdit.dueDate,
    });
     console.log(singleTodoEdit);
     this.index = taskIndex
  }

  updateTodo() {
    console.log('update todo');
    let singleTodoUpdate = this.todosValues[this.index];
    console.log(this.index);
    console.log(singleTodoUpdate);

    singleTodoUpdate.task = this.form.value.task;
    singleTodoUpdate.priority = this.form.value.priority;
    singleTodoUpdate.dueDate = this.form.value.dueDate;

    localStorage.setItem(
      singleTodoUpdate.taskId, JSON.stringify(singleTodoUpdate));
      this.form.reset();
  }
}
