/*import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {



  BASE_URL="http://localhost:9017/admin/";

  constructor(private httpClient:HttpClient) { }

   addProfile(admin:any){
   return this.httpClient.post(`${this.BASE_URL}addProfile`,admin);
   }

   updateProfile(admin:any){

    return this.httpClient.put(`${this.BASE_URL}updateProfile/:id`,admin);

   }

   deleteProfile(admin:any){

    return this.httpClient.delete(`${this.BASE_URL}deleteProfile/:id`,admin);

   }
   

   //headers={'authorization': `bearer ${localStorage.getItem('token')}`}

    headers:any = new HttpHeaders();
}*/

import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ProfileService {
  
  baseUrl:string = "http://localhost:8185/lead";
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // Create
  addProfile(data:any): Observable<any> {
    let url = `http://localhost:8185/lead/createLead`;
    return this.http.post(url, data)
      .pipe(
        
        catchError(this.errorMgmt)
      )
  }

  // Get all profiles
  allProfiles() {
    return this.http.get(`${this.baseUrl}/allLeads`);
  }

  // Get profile by id
  getProfileById(id:any): Observable<any> {
    let url = `${this.baseUrl}/lead/:id${id}`;
    return this.http.get(url, {headers: this.headers}).pipe(

      catchError(this.errorMgmt)
    )
  }

  // Update profile
  updateProfile(id:any, data:any): Observable<any> {
    let url = `http://localhost:8185/lead/updatelead`;
    return this.http.put(url, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Delete profile
  deleteProfile(id:any): Observable<any> {
    let url = `http://localhost:8185/lead/deletelead`;
    return this.http.delete(url, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Error handling 
 errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
