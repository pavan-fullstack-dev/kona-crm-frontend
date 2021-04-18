import { Router } from '@angular/router';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-create-leads',
  templateUrl: './create-leads.component.html',
  styleUrls: ['./create-leads.component.css']
})

export class CreateLeadsComponent implements OnInit {  
  submitted = false;
  employeeForm: any;
  EmployeeProfile:any;
  
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private profileService: ProfileService
  )
   { 
    this.mainForm();
  }

  ngOnInit():void {
    
   }

  mainForm() {
    this.employeeForm = this.fb.group({
      pid:['',Validators.required],
      source: ['', [Validators.required]],
      technology: ['', [Validators.required]],
      emailId: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      mobile: ['', [Validators.required,
        Validators.minLength(10),
        Validators.pattern(/^[0-9]{10}$/)]]
    })
  }

  // Choose designation with select dropdown
  updateProfile(e:any){
    this.employeeForm.get('pid').setValue(e, {
      onlySelf: true
    })
  }

  // Getter to access form control
  get myForm(){
    return this.employeeForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.employeeForm);
    if (!this.employeeForm.valid) {
      return  ;
    } else {
      this.profileService.addProfile(this.employeeForm.value).subscribe(
        (res) => {
          console.log('Employee successfully created!')
          this.ngZone.run(() => this.router.navigateByUrl('/leads-list'))
        }, (error) => {
          console.log(error);
        });
    }
   }

}
