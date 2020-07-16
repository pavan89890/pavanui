import { ApiService } from '../services/api.service';
import { NgForm } from '@angular/forms';
import { Events } from '../model/events';
import { DatePipe } from '@angular/common';
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements AfterViewInit,OnInit,OnDestroy {

  url: string = "events"

  constructor(private apiService: ApiService,private datePipe: DatePipe) { }

  event = new Events();
  events: Events[] = [];

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
  
  edit(event: Events) {
    if (event) {
      this.event = event;
      this.event.eventDate = this.datePipe.transform(event.eventDate, 'yyyy-MM-dd');
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
      this.rerender();
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
