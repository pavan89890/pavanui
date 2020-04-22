import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
 
  //  backendUrl:string="http://localhost:8080/api/";
   backendUrl:string="https://pavanprasad.herokuapp.com/api/";

  getApiService(url:string):any{
    return this.http.get(this.backendUrl+url);
  }

  postApiService(url:string,data:any):any{
    return this.http.post(this.backendUrl+url,data);
  }

  deleteApiService(url:string):Observable<any>{
    return this.http.delete(this.backendUrl+url);
  }

  downloadApiService(url:string):any{
    return this.http.get(this.backendUrl+url);
  }

}
