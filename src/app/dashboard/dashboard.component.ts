import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Bank } from '../model/bank';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private apiService: ApiService) { }
  data:any;
  url: string = "users"
    ngOnInit() {
      this.get();
     }
     
     get(){
       var userToken=localStorage.getItem('userToken');
       this.apiService.getApiService(this.url+"/userToken/"+userToken).subscribe(response=>{
         if(response.data){
           this.data=response.data;
         }
       })
     }
  

}
