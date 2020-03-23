import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-download-data',
  templateUrl: './download-data.component.html',
  styleUrls: ['./download-data.component.css']
})
export class DownloadDataComponent implements OnInit {

  constructor(private apiService:ApiService) { }

  msg:string="";
  url:string="downloaddata";

  ngOnInit() {
    this.downloadExcelData();
  }

  downloadExcelData(){
    this.msg="Please wait...";
    this.apiService.downloadApiService(this.url).subscribe(
      (success: any) => {
        var blob = new Blob([success._body], { type: 'application/vnd.ms-excel' });
        let fileName="PavanPrasadData";
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(blob, fileName);
        } else {
          var a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = fileName;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }
      },
      err => {
        alert("Error while downloading. File Not Found on the Server");
      }
    );
    this.msg="";
  }

}
