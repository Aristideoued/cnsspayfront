import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Admin } from './admin.model';
import { environment } from 'environments/environment.development';
import { AuthService } from '@core/service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private readonly API_URL = 'assets/data/admins.json';
  token: string;

  constructor(private httpClient: HttpClient,  private authService: AuthService) {
    this.token = 'Basic ' + window.btoa(environment.username + ":" + environment.password);
  }

  /** GET: Récupérer tous les administrateurs */
  getAllAdmins(): Observable<Admin[]> {
    console.log("Bearer "+this.authService.currentUserValue.token)
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+this.authService.currentUserValue.token
    });

    return this.httpClient.get<Admin[]>(environment.apiUrl + "user/liste", { headers });
  }

    getRoles(): Observable<any[]> {
    console.log("Bearer "+this.authService.currentUserValue.token)
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+this.authService.currentUserValue.token
    });

    return this.httpClient.get<any[]>(environment.apiUrl + "role/liste", { headers });
  }

  /** POST: Ajouter un nouvel administrateur */
  addAdmin(admin: Admin): Observable<Admin> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
     'Authorization': "Bearer "+this.authService.currentUserValue.token
    });

    const adminData = {
      username: admin.username,
      password: admin.password,
      nom: admin.nom,
      prenom: admin.prenom,
      roles: [{ "id": admin.roleid }] ,
      telephone: admin.telephone
    };
    console.log(adminData)

    return this.httpClient
      .post<any>(environment.apiUrl + "user/creer",JSON.stringify(adminData) , { headers })
      .pipe(
        map((response) => new Admin({
          id: response.id || admin.id,
          username: response.username || admin.username,
          password: response.password || admin.password,
          nom: response.nom || admin.nom,
          prenom: response.prenom || admin.prenom,
         // role: response.role || admin.role,
          telephone: response.telephone || admin.telephone
        })),
        catchError(this.handleError)
      );
  }

  /** PUT: Mettre à jour un administrateur existant */
  updateAdmin(admin: Admin): Observable<Admin> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer "+this.authService.currentUserValue.token
    });

    const adminData = {
      id: admin.id,
      username: admin.username,
     
      nom: admin.nom,
      prenom: admin.prenom,
       roles: [{ "id": admin.roleid }] ,
      telephone: admin.telephone
    };

    console.log(adminData)

    return this.httpClient
      .put<any>(`${environment.apiUrl}user/update/`+admin.id, adminData, { headers })
      .pipe(
        map((response) => new Admin({
          id: response.id || admin.id,
          username: response.username || admin.username,
          password: response.password || admin.password,
          nom: response.nom || admin.nom,
          prenom: response.prenom || admin.prenom,
          role: response.role || admin.role,
          telephone: response.telephone || admin.telephone
        })),
        catchError(this.handleError)
      );
  }

  /** DELETE: Supprimer un administrateur par ID */
  deleteAdmin(id: number): Observable<number> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+this.authService.currentUserValue.token
    });

   
    return this.httpClient
      .delete<void>(`${environment.apiUrl}user/delete/`+id)
      .pipe(
        map(() => id),
        catchError(this.handleError)
      );
  }

  /** Gérer les erreurs d'opération Http qui ont échoué */
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Une erreur s\'est produite:', error.message);
    return throwError(
      () => new Error('Quelque chose s\'est mal passé; veuillez réessayer plus tard.')
    );
  }
}