import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  apiResponse:any;
 
  constructor(private userService:UserService,private formBuilder:FormBuilder,private router:Router) { }

  submitted = false;
  registerForm:any;

  ngOnInit(): void  {
    this.registerForm = this.formBuilder.group({
      
      emailId: ['', [Validators.required,Validators.email]],
      currentPassword: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit(){
   
    this.submitted = true;

    
    if (this.registerForm.invalid) {
        return;
    }
    else{
      this.userService.changePassword(this.registerForm.value).subscribe(
        response => {
          console.log(response);
  
        },
        error => {
          console.log(error);

        }
     )
    }
  
  }
}
