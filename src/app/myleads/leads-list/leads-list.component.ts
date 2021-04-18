import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-leads-list',
  templateUrl: './leads-list.component.html',
  styleUrls: ['./leads-list.component.css']
})

export class LeadsListComponent implements OnInit {
  
  lead:any = [];

  constructor(private profileService:ProfileService,private router:Router) { 
    this.readEmployee();
  }

  ngOnInit() {}

 readEmployee(){
    this.profileService.allProfiles().subscribe((data) => {
     this.lead = data;
    })    
  }

  removeEmployee(employee:any,index:any) {
    if(window.confirm('Are you sure?')) {
        this.profileService.deleteProfile(employee.pid).subscribe((data) => {
          this.lead.splice(index,1);
          this.router.navigateByUrl('/leads-list');
        }
      )    
    }
  }

}