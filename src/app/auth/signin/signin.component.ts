import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
   
  }
  signIn(ngform:NgForm){
    const email = ngform.value.email
    const password = ngform.value.password
    this.authService.signInUser(email,password)
  }
  
}
