import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
// import {Employee} from '../../Employee';
import {Employee} from '../../Employee';

@Component({
  selector: 'app-edit-leads',
  templateUrl: './edit-leads.component.html',
  styleUrls: ['./edit-leads.component.css']
})
export class EditLeadsComponent implements OnInit {

  submitted = false;
  editForm: any;
  employeeData:any;
  id:any;
 // EmployeeProfile: any = ['Finance', 'BDM', 'HR', 'Sales', 'Admin']

  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private profileService: ProfileService,
    private router: Router
  ) {}

  ngOnInit() {
    //this.updateEmployee();
    let id = this.actRoute.snapshot.paramMap.get('id');
    
    this.editForm = this.fb.group({
      pid: ['', [Validators.required]],
      emailId: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      //designation: ['', [Validators.required]],
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      technology:['',
    Validators.required]
    })
  }

  // Choose options with select-dropdown
  updateProfile(e:any) {
    this.editForm.get('emailId').setValue(e, {
      onlySelf: true
    })
  }

  // Getter to access form control
  get myForm() {
    return this.editForm.controls;
  }

 

  getProfileById(id:any) {
    this.profileService.getProfileById(id).subscribe(data => {
      this.editForm.setValue({
        pid: data['pid'],
        emailId: data['emailId'],
        mobile: data['mobile'],
      });
    });
  }

  onSubmit() {
    this.submitted = true;
    if (!this.editForm.valid) {
      return 
    } else {
      if (window.confirm('Are you sure?')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.profileService.updateProfile(id, this.editForm.value)
          .subscribe(res => {
            this.router.navigateByUrl('/leads-list');
            console.log('Content updated successfully!')
          }, (error) => {
            console.log(error)
          })
      }
    }
  }

}
