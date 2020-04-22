import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ApiService } from '../services/api.service';
declare var $: any;

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  form;
  isValidForm:boolean=true;
  errorMsg:string;

  url: string = "users"

  constructor(private fb: FormBuilder,
    private myRoute: Router,
    private apiService: ApiService) {
      this.form = fb.group({
        name: ['', [Validators.required]],
        email: ['', Validators.required],
        mobile: ['', Validators.required],
        password: ['', Validators.required]
      });
     }

  ngOnInit() {
    $("body").removeClass('skin-purple sidebar-mini');
    $("body").css("background-color","#ecf0f5");
  }

  register(){
    if(this.form.valid){
      this.apiService.postApiService(this.url, this.form.value).subscribe(response=>{
        alert(response.message);
        this.form.value=null;
        this.myRoute.navigate(["/login"]);
      });
      
    }else{
      this.isValidForm=false;
    }
  }

}
