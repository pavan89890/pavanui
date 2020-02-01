import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Chit } from '../model/chit';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-chits',
  templateUrl: './chits.component.html',
  styleUrls: ['./chits.component.css']
})
export class ChitsComponent implements OnInit {

  
  url:string="chits";
  noOfChits=36;
  noOfChitsPaid=0;
  totalChitAmount:number=0;
  totalAmountPaid:number=0;
  totalProfit:number=0;

  constructor(private apiService:ApiService) { 
    
  }

  chit=new Chit();
  chits:Chit[]=[];
  
   ngOnInit() {
    this.get();
   }
   edit(chit:Chit) {
     if (chit) {
       this.chit = chit;
     } else {
       this.chit = new Chit();
     }
 
   }
 
   get(){
     this.apiService.getApiService(this.url).subscribe(response=>{
       this.chits=[];
       this.noOfChitsPaid=0;
       if(response.data){
         this.chits=response.data.chits;
         this.noOfChitsPaid=this.chits.length;
         this.totalAmountPaid=response.data.totalDeposited;
         this.totalChitAmount=response.data.totalMatured;
         this.totalProfit=response.data.totalProfit;
       }
     })
   }
 
   save(form: NgForm) {
     this.apiService.postApiService(this.url, this.chit).subscribe(response=>{
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
