import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Bank } from '../model/bank';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css']
})
export class AssetsComponent implements OnInit {

  url: string = "assets"

  constructor(private apiService: ApiService) { }

  bankBalance:number=0;
  chitBalance:number=0;
  fdBalance:number=0;
  mfBalance:number=0;
  totalGross:number=0;
  totalBalance:number=0;

  ngOnInit() {
   this.get();
  }
  
  get(){
    this.apiService.getApiService(this.url).subscribe(response=>{
      if(response.data){
        this.bankBalance=response.data.bankBalance;
        this.chitBalance=response.data.chitBalance;
        this.fdBalance=response.data.fdBalance;
        this.mfBalance=response.data.mfBalance;
        this.totalBalance=response.data.totalBalance;
        this.totalGross=response.data.totalGross?response.data.totalGross:0;
      }
    })
  }
}
