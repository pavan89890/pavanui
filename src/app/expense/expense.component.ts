import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Expense } from '../model/expense';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements AfterViewInit,OnInit,OnDestroy {
  url: string = "expenses"

  constructor(private apiService: ApiService,private datePipe:DatePipe) { }

  expense = new Expense();
  expenses: Expense[] = [];
  totalExpenses: number = 0;

  dtOptions: any= {};
  dtTrigger: Subject<any> = new Subject();

  @ViewChild  (DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      // Declare the use of the extension in the dom parameter
      dom: 'Bfrtip',
      // Configure the buttons
      buttons: [
        'copy',
        'print',
        'excel',
        'pdf'
      ]
    };
    this.get("");
    

  }

  edit(expense: Expense) {
    if (expense) {
      this.expense = expense;
      this.expense.expenseDate = this.datePipe.transform(expense.expenseDate, 'yyyy-MM-dd');
    } else {
      this.expense = new Expense();
    }

  }

  get(expenseType: string) {
    
    var urlVal = this.url;
    if (expenseType && expenseType != "All") {
      urlVal = this.url + "?expenseType=" + expenseType;
    }
    this.apiService.getApiService(urlVal).subscribe(response => {
      this.expenses = [];
      this.totalExpenses = 0;
      if (response.data) {
        this.expenses = response.data.expenses;
        this.totalExpenses = response.data.totalExpenses;
      }
      this.rerender();
    })
   
  }

  save(form: NgForm) {
    this.apiService.postApiService(this.url, this.expense).subscribe(response => {
      alert(response.message);
      form.resetForm();
      this.get("");
    });

  }

  delete(id: any) {
    if (confirm("Are you sure you want to delete?")) {
      this.apiService.deleteApiService(this.url + "/" + id).subscribe(response => {
        alert(response.message);
        this.get("");
      });
    }
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }
}
