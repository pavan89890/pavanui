import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router) { }

  sendToken(token: string) {
    localStorage.setItem("userToken", token)
  }

  getToken() {
    return localStorage.getItem("userToken");
  }

  isLoggednIn() {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem("userToken");
    this.router.navigate(['/login']);
  }
}
