import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import {  Plateforme } from './employees.model';
import { environment } from 'environments/environment.development';
import { AuthService } from '@core/service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  private readonly API_URL = 'assets/data/employees.json';
  token: string;
  
  constructor(private httpClient: HttpClient,private authService: AuthService) {
        this.token='Basic ' + window.btoa(environment.username + ":" + environment.password);
    
  }

  /** GET: Récupérer tous les employés */
  getPlateforme2(): Observable<Plateforme[]> {

     let headers= new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization:this.token})
      
    return this.httpClient
      .get<Plateforme[]>(environment.apiUrl+"users",{headers:headers})
      .pipe(
        map((data: any[]) => 
        
          data.map(item => new Plateforme(item))
      ),
        catchError(this.handleError)
      );
  }

   getPlateforme(): Observable<Plateforme[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+this.authService.currentUserValue.token
    });

    return this.httpClient.get<Plateforme[]>(environment.apiUrl+"plateforme/liste", { headers });
  }

  /** POST: Ajouter un nouvel employé */



      /*updateEmployee(employee: Plateforme): Observable<Plateforme> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.token
      });
  
      const userData = {
        id:employee.id,
        email:employee.email,
        genre:employee.genre,
        departement_id:employee.departement,
        titre: employee.titre,
        statut:employee.statut,
        nom: employee.nom,
        prenom: employee.prenom,
        role_id: 2,
        phone: employee.telephone.toString()
       
      };

      console.log("Le user envoyé============> ",userData)
  
      return this.httpClient
        .post<any>(environment.apiUrl + "update/user",JSON.stringify(userData) , { headers })
        .pipe(
          map((response) => new Employees({
            id: response.id || employee.id,
            titre: response.username || employee.titre,
            password: response.password || employee.password,
            nom: response.nom || employee.nom,
            genre: response.genre || employee.genre,
            prenom: response.prenom || employee.prenom,
           
            telephone: response.phone || employee.telephone
          })),
          catchError(this.handleError)
        );
    }


    addEmployee(employee: Employees): Observable<Employees> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.token
      });
  
      const userData = {
        email:employee.email,
        genre:employee.genre,
        departement_id:employee.departement,
        titre: employee.titre,
        password: employee.password,
        nom: employee.nom,
        prenom: employee.prenom,
        role_id: 2,
        phone: employee.telephone.toString()
       
      };

      console.log("Le user envoyé============> ",userData)
  
      return this.httpClient
        .post<any>(environment.apiUrl + "userRegister",JSON.stringify(userData) , { headers })
        .pipe(
          map((response) => new Employees({
            id: response.id || employee.id,
            titre: response.username || employee.titre,
            password: response.password || employee.password,
            nom: response.nom || employee.nom,
            genre: response.genre || employee.genre,
            prenom: response.prenom || employee.prenom,
           
           // role: response.role || admin.role,
            telephone: response.phone || employee.telephone
          })),
          catchError(this.handleError)
        );
    }


       deleteEmployee(id: number): Observable<Employees> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.token
      });
  
      const userData = {
        id:id,
      
       
      };

      console.log("Le user envoyé============> ",userData)
  
      return this.httpClient
        .post<any>(environment.apiUrl + "delete/user",JSON.stringify(userData) , { headers })
        .pipe(
          map((response) => new Employees({
            id: response.id || id
           
           
          
          })),
          catchError(this.handleError)
        );
    }*/

  /*addEmployee2(employee: Employees): Observable<Employees> {
    return this.httpClient.post<Employees>(this.API_URL, employee).pipe(
      map(() => {
        return employee; // retourner l'employé nouvellement ajouté
      }),
      catchError(this.handleError)
    );
  }*/

  /** PUT: Mettre à jour un employé existant */
 /* updateEmployee2(employee: Employees): Observable<Employees> {
    return this.httpClient.put<Employees>(`${this.API_URL}`, employee).pipe(
      map(() => {
        return employee; // retourner l'employé mis à jour
      }),
      catchError(this.handleError)
    );
  }*/

  /** DELETE: Supprimer un employé par ID */
  /*deleteEmployee2(id: number): Observable<number> {
    return this.httpClient.delete<void>(`${this.API_URL}`).pipe(
      map(() => {
        return id; // retourner l'ID de l'employé supprimé
      }),
      catchError(this.handleError)
    );
  }

  */

  /** Gérer les erreurs d'opération Http qui ont échoué */
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Une erreur s\'est produite:', error.message);
    return throwError(
      () => new Error('Quelque chose s\'est mal passé; veuillez réessayer plus tard.')
    );
  }
}