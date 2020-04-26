import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ApiService } from '../services/api.service';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form;

  isValidUser:boolean=true;
  url:string="login";

  constructor(private fb: FormBuilder,
    private myRoute: Router,
    private auth: AuthService,
    private apiService:ApiService) {
      this.form = fb.group({
        username: ['', [Validators.required]],
        password: ['', Validators.required]
      });
     }

  ngOnInit() {
    $("body").removeClass('skin-purple sidebar-mini');
    $("body").css("background-color","#ecf0f5");
  }

  login(){
    if(this.form.valid){
      this.apiService.postApiService(this.url,{"username":this.form.value.username,"password":this.form.value.password}).subscribe(response=>{
        if(response.data){
          this.auth.sendToken(response.data.userToken);
          this.myRoute.navigate(["/dashboard"]);
        }else{
          alert(response.message);
        }
      });
    }else{
      this.isValidUser=false;
    }
  }

}
