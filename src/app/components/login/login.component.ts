import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  apiResponse:any;
  

  constructor(private formBuilder: FormBuilder,private userService:UserService,private router:Router) { }

  submitted = false;
  loginForm:any;


  ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
      emailId: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      alert("incorrect details")
        return;
    }
    else{

      this.userService.loginUser(this.loginForm.value)
      .pipe(first())
      .subscribe(
        response => {
          console.log(response);
            
           this.apiResponse=response;
           
           if(this.apiResponse.token){
             localStorage.setItem('token',this.apiResponse.token);
             this.router.navigateByUrl('/dash');

           }
           else{
             alert("incorrect password");
           }
          
     
        },
        error => {
          console.log(error);
          });
      
    }
      
  } 
}
