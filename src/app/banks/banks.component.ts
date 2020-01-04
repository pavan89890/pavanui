import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Bank } from '../model/bank';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-banks',
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.css']
})
export class BanksComponent implements OnInit {

  url: string = "banks"

  constructor(private apiService: ApiService) { }

  bank = new Bank();
  banks: Bank[] = [];
  totalBalance: number = 0;

  ngOnInit() {
   this.get();
  }
  
  edit(bank: Bank) {
    if (bank) {
      this.bank = bank;
    } else {
      this.bank = new Bank();
    }

  }

  get(){
    this.apiService.getApiService(this.url).subscribe(response=>{
      this.banks=[];
      this.totalBalance=0;
      if(response.data){
        this.banks=response.data.banks;
        this.totalBalance=response.data.totalBalance;
      }
    })
  }

  save(form: NgForm) {
    this.apiService.postApiService(this.url, this.bank).subscribe(response=>{
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
