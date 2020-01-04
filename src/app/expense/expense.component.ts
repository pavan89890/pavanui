import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Expense } from '../model/expense';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {
  url: string = "expenses"

  constructor(private apiService: ApiService) { }

  expense = new Expense();
  expenses: Expense[] = [];
  totalExpenses: number = 0;

  ngOnInit() {
   this.get();
  }
  
  edit(expense: Expense) {
    if (expense) {
      this.expense = expense;
    } else {
      this.expense = new Expense();
    }

  }

  get(){
    this.apiService.getApiService(this.url).subscribe(response=>{
      this.expenses=[];
      this.totalExpenses=0;
      if(response.data){
        this.expenses=response.data.expenses;
        this.totalExpenses=response.data.totalExpenses;
      }
    })
  }

  save(form: NgForm) {
    this.apiService.postApiService(this.url, this.expense).subscribe(response=>{
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
