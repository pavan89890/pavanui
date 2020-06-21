import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { NgForm } from '@angular/forms';
import { Events } from '../model/events';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  url: string = "events"

  constructor(private apiService: ApiService) { }

  event = new Events();
  events: Events[] = [];

  ngOnInit() {
   this.get("");
  }
  
  edit(event: Events) {
    if (event) {
      this.event = event;
    } else {
      this.event = new Events();
    }

  }

  get(eventType:string){
    var urlVal = this.url;
    if (eventType && eventType != "All") {
      urlVal = this.url + "?eventType=" + eventType;
    }
    this.apiService.getApiService(urlVal).subscribe(response=>{
      this.events=[];
      if(response.data){
        this.events=response.data.events;
      }
    })
  }

  save(form: NgForm) {
    this.apiService.postApiService(this.url, this.event).subscribe(response=>{
      alert(response.message);
      form.resetForm();
      this.get("");
    });
    
  }

  delete(id: any) {
    if (confirm("Are you sure you want to delete?")) {
      this.apiService.deleteApiService(this.url+"/"+id).subscribe(response=>{
        alert(response.message);
        this.get("");
      });
    }
  }

}
