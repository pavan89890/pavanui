import { Component, OnInit } from '@angular/core';
import {ApiService} from '../services/api.service'
import { Mutualfund } from '../model/mutualfund';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-mutualfunds',
  templateUrl: './mutualfunds.component.html',
  styleUrls: ['./mutualfunds.component.css']
})
export class MutualfundsComponent implements OnInit {

  url:string="mfs";
  totalInvested:number=0;
  totalCurrent:number=0;
  totalProfitprofitOrLossAmount:number=0;
  totalProfitprofitOrLossPerc:number=0;

  constructor(private apiService:ApiService,private datePipe:DatePipe) {
    
   }

  mutualfund=new Mutualfund();
  mutualfunds:Mutualfund[]=[];
  
  ngOnInit() {
    this.get();
  }

   edit(mutualfund:Mutualfund) {
     if (mutualfund) {
       this.mutualfund = mutualfund;
       this.mutualfund.depositedOn = this.datePipe.transform(mutualfund.depositedOn, 'yyyy-MM-dd');
     } else {
       this.mutualfund = new Mutualfund();
     }
 
   }
 
   get(){
     this.apiService.getApiService(this.url).subscribe(response=>{
       this.mutualfunds=[];
      
       if(response.data){
         this.mutualfunds=response.data.mfs;
         this.totalInvested=response.data.totalInvested;
         this.totalCurrent=response.data.totalCurrent;
         this.totalProfitprofitOrLossAmount=response.data.totalProfitprofitOrLossAmount;
         this.totalProfitprofitOrLossPerc=response.data.totalProfitprofitOrLossPerc;
       }
     })
   }
 
   save(form: NgForm) {
     this.apiService.postApiService(this.url, this.mutualfund).subscribe(response=>{
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
