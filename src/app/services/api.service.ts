import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
 
  //  backendUrl:string="http://localhost:8080/api/";
  backendUrl:string="https://pavanprasad.herokuapp.com/api/";

  userToken:string=localStorage.getItem("userToken")!=null?localStorage.getItem("userToken"):"";

  getApiService(url:string):any{
    let headers = new HttpHeaders;
    headers = headers.set('userToken',this.userToken );
    return this.http.get(this.backendUrl+url,{headers});
  }

  postApiService(url:string,data:any):any{
    let headers = new HttpHeaders;
    headers = headers.set('userToken',this.userToken );
    return this.http.post(this.backendUrl+url,data,{headers});
  }

  deleteApiService(url:string):Observable<any>{
    let headers = new HttpHeaders;
    headers = headers.set('userToken',this.userToken );
    return this.http.delete(this.backendUrl+url,{headers});
  }

  downloadApiService(url:string):any{
    let headers = new HttpHeaders;
    headers = headers.set('userToken',this.userToken );
    return this.http.get(this.backendUrl+url,{headers});
  }

}
