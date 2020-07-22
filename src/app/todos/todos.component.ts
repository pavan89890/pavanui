import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { Todo } from '../model/todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  url: string = "todo"

  constructor(private apiService: ApiService) { }

  todo = new Todo();
  todos: Todo[] = [];

  ngOnInit() {
   this.get();
  }
  
  edit(todo: Todo) {
    if (todo) {
      this.todo = todo;
    } else {
      this.todo = new Todo();
    }

  }

  get(){
    this.apiService.getApiService(this.url).subscribe(response=>{
      this.todos=[];
      if(response.data){
        this.todos=response.data.todos;
      }
    })
  }

  save(form: NgForm) {
    this.apiService.postApiService(this.url, this.todo).subscribe(response=>{
      alert(response.message);
      form.resetForm();
      this.get();
    });
    
  }

  delete(id: any) {
    if (confirm("Are you sure you want to delete?")) {
      this.apiService.deleteApiService(this.url+"/"+id).subscribe(response=>{
        alert(response.message);
        this.get();
      });
    }
  }

}
