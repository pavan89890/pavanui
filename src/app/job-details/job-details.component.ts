import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { JobDetail } from '../model/job-detail';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {

  url:string="jobs";
  totalExperience:string;

  constructor(private apiService:ApiService) {
    
   }

  jobDetail=new JobDetail();
  jobDetails:JobDetail[]=[];
  
  ngOnInit() {
    this.get();
  }

  get(){
    this.apiService.getApiService(this.url).subscribe(response=>{
      this.jobDetails=[];
     
      if(response.data){
        this.jobDetails=response.data.jobs;
        this.totalExperience=response.data.totalExperience;
      }
    })
  }

  save(form: NgForm) {
    this.apiService.postApiService(this.url, this.jobDetail).subscribe(response=>{
      alert(response.message);
      form.resetForm();
      this.get();
    });
    
  }

  
  edit(jobDetail:JobDetail) {
    if (jobDetail) {
      this.jobDetail = jobDetail;
    } else {
      this.jobDetail = new JobDetail();
    }

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
