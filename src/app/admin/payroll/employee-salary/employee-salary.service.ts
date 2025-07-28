import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, map } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EmployeeSalary } from './employee-salary.model';
import { environment } from 'environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class EmployeeSalaryService {
  private readonly API_URL = 'assets/data/employee-salary.json';
  token: string;

  constructor(private httpClient: HttpClient) {
         this.token='Basic ' + window.btoa(environment.username + ":" + environment.password);
    
  }

  /** GET: Fetch all employee salaries */
  getPlateformealaries(): Observable<EmployeeSalary[]> {
    return this.httpClient
      .get<EmployeeSalary[]>(this.API_URL)
      .pipe(catchError(this.handleError));
  }


  /** POST: Add a new employee salary */
  addEmployeeSalary(
    employeeSalary: EmployeeSalary
  ): Observable<EmployeeSalary> {
    return this.httpClient
      .post<EmployeeSalary>(this.API_URL, employeeSalary)
      .pipe(
        map(() => {
          return employeeSalary; // Return the newly added employee salary
        }),
        catchError(this.handleError)
      );
  }



    startMonitoring(): Observable<any> {
   

    return this.httpClient.get<any>(environment.apiUrl + "monitoring");
  }

  getAllMonitoring(): Observable<EmployeeSalary[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token
    });

    return this.httpClient.get<EmployeeSalary[]>(environment.apiUrl + "monitorings", { headers });
  }
       deleteMonitoring(monito: any): Observable<any> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.token
      });
  
      // Transformer le client en bénéficiaire pour l'API
     
      console.log("sent=======> ",monito)
  
      return this.httpClient
        .post<any>(environment.apiUrl + "delete/monitoring", JSON.stringify({id:monito}), { headers })
        .pipe(
          map((response) => {
            id: response.id 
          
           
          
      
         
            
          }),
          catchError(this.handleError)
        );
    }


        addMonitoring(monito: any): Observable<any> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.token
      });
  
      // Transformer le client en bénéficiaire pour l'API
     
      console.log("sent=======> ",monito)
  
      return this.httpClient
        .post<any>(environment.apiUrl + "addMonitoring", JSON.stringify(monito), { headers })
        .pipe(
          map((response) => {
            id: response.id 
          
           
          
      
         
            
          }),
          catchError(this.handleError)
        );
    }


          updateMonitoring(monito: any): Observable<any> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.token
      });
  
      // Transformer le client en bénéficiaire pour l'API
     
      console.log("sent=======> ",monito)
  
      return this.httpClient
        .post<any>(environment.apiUrl + "update/monitoring", JSON.stringify(monito), { headers })
        .pipe(
          map((response) => {
            id: response.id 
          
           
          
      
         
            
          }),
          catchError(this.handleError)
        );
    }
  /** PUT: Update an existing employee salary */
  updateEmployeeSalary(
    employeeSalary: EmployeeSalary
  ): Observable<EmployeeSalary> {
    return this.httpClient
      .put<EmployeeSalary>(`${this.API_URL}`, employeeSalary) // Ensure to use the correct endpoint as per your API
      .pipe(
        map(() => {
          return employeeSalary; // Return the updated employee salary
        }),
        catchError(this.handleError)
      );
  }

  /** DELETE: Remove an employee salary by ID */
  deleteEmployeeSalary(id: number): Observable<number> {
    return this.httpClient.delete<void>(`${this.API_URL}`).pipe(
      map(() => {
        return id; // Return the ID of the deleted employee salary
      }),
      catchError(this.handleError)
    );
  }

  /** Handle Http operation that failed */
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error.message);
    return throwError(
      () => new Error('Something went wrong; please try again later.')
    );
  }
}
