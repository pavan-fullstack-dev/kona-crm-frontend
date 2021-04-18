import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  apiResponse:any;

  constructor(private formBuilder: FormBuilder,private userService:UserService,private router:Router) { }

  submitted = false;
  registerForm:any;

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstname: ['', 
      [Validators.required,
      Validators.minLength(5)]],
      lastname: ['', 
      [Validators.required,
      Validators.minLength(4)]],
      emailId: ['', [Validators.required,
      Validators.pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)]],
      mobile: ['', [Validators.required,
      Validators.pattern(/^[0-9]{10}$/)]],
      password: ['', [Validators.required,
      Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/)]]
    });
  }
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    
    if (this.registerForm.invalid) {
        return;
    }
    else{
      this.userService.registerUser(this.registerForm.value).subscribe(
        response => {
          console.log(response);
            
           this.apiResponse=response;
           
           if(this.apiResponse.token){
             localStorage.setItem('token',this.apiResponse.token);
             this.router.navigateByUrl('/');

           }
           else
           {
             alert("user not registered!");
           }
     
        },
        error => {
          console.log(error);
        }
     )
    }
  }
}
