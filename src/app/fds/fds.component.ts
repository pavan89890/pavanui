import { Component, OnInit } from '@angular/core';
import {ApiService} from '../services/api.service'
import { Fd } from '../model/fd';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-fds',
  templateUrl: './fds.component.html',
  styleUrls: ['./fds.component.css']
})
export class FdsComponent implements OnInit {

  

  url:string="fds";
  totalDeposited:number=0;
  totalMatured:number=0;
  totalProfit:number=0;

  constructor(private apiService:ApiService) {
    
   }

  fd=new Fd();
  fds:Fd[]=[];
  
  ngOnInit() {
    this.get();
  }

   edit(fd:Fd) {
     if (fd) {
       this.fd = fd;
     } else {
       this.fd = new Fd();
     }
 
   }
 
   get(){
     this.apiService.getApiService(this.url).subscribe(response=>{
       this.fds=[];
      
       if(response.data){
         this.fds=response.data.fds;
         this.totalDeposited=response.data.totalDeposited;
         this.totalMatured=response.data.totalMatured;
         this.totalProfit=response.data.totalProfit;
       }
     })
   }
 
   save(form: NgForm) {
     this.apiService.postApiService(this.url, this.fd).subscribe(response=>{
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
