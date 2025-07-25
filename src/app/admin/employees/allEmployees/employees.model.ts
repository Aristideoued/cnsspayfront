import { formatDate } from '@angular/common';

export class Employees {
  id: number;
  statut: string;
  nom: string;
  prenom: string;
  password: string;
  nomComplet: string;
  genre:string;
  titre: string;
  telephone: string;
  email: string;
  departement: string;
  departement_id: number;
  statut_id: number;
  img?: string;
  role?: string;

  
  // Nouvelles propriétés pour correspondre au form-dialog
  /*name: string; // Alias pour nom complet
  birthDate?: Date | string;
  role: string; // Alias pour titre
  mobile: string; // Alias pour telephone
  department: string; // Alias pour departement (en anglais)
  degree?: string;
  gender?: string;
  address?: string;
  joiningDate?: Date | string;
  salary?: number;
  lastPromotionDate?: Date | string;
  employeeStatus?: string;
  workLocation?: string;*/

  constructor(employees: Partial<Employees>) {
    this.id = employees.id || this.getRandomID();
    this.statut = employees.statut || 'Actif';
    this.nom = employees.nom || '';
    this.nomComplet = employees.nom+" "+employees.prenom || '';
    this.role = employees.role || 'Employee';
    this.prenom = employees.prenom || '';
    this.password = employees.password || '';
    this.titre = employees.titre || '';
    this.departement_id = employees.departement_id || 0;
     this.statut_id = employees.statut_id || 11;
    this.telephone = employees.telephone || '';
    this.email = employees.email || '';
    this.genre = employees.genre || '';
    this.departement = employees.departement || '';
    this.img = employees.img || 'assets/images/avatar.jpg';
    
    // Initialiser les nouvelles propriétés
  /*  this.name = employees.name || this.nomComplet;
    this.birthDate = employees.birthDate || '';
    this.role = employees.role || this.titre;
    this.mobile = employees.mobile || this.telephone;
    this.department = employees.department || this.departement;
    this.degree = employees.degree || '';
    this.gender = employees.gender || '';
    this.address = employees.address || '';
    this.joiningDate = employees.joiningDate || '';
    this.salary = employees.salary || 0;
    this.lastPromotionDate = employees.lastPromotionDate || '';
    this.employeeStatus = employees.employeeStatus || this.statut;
    this.workLocation = employees.workLocation || '';*/
  }

  // Getter pour obtenir le nom complet
  /*get nomComplet(): string {
    return `${this.prenom} ${this.nom}`.trim();
  }*/


  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}