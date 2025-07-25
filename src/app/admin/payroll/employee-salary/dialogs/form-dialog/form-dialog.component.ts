import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogContent,
  MatDialogClose,
} from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { EmployeeSalaryService } from '../../employee-salary.service';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { EmployeeSalary } from '../../employee-salary.model';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ClientsService } from 'app/admin/clients/all-clients/clients.service';
import { CommonModule } from '@angular/common';
import moment from 'moment';

export interface DialogData {
  id: number;
  action: string;
  employeeSalary: EmployeeSalary;
}

@Component({
    selector: 'app-employee-salary-form',
    templateUrl: './form-dialog.component.html',
    styleUrls: ['./form-dialog.component.scss'],
    imports: [
        MatButtonModule,
        MatIconModule,
        MatDialogContent,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatOptionModule,
        MatDialogClose,
        MatDatepickerModule,CommonModule
    ]
})
export class EmployeeSalaryFormComponent {
  action: string;
  dialogTitle: string;
  employeeSalaryForm: UntypedFormGroup;
  employeeSalary: EmployeeSalary;
  beneficiaires: any;

  constructor(
    public dialogRef: MatDialogRef<EmployeeSalaryFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public employeeSalaryService: EmployeeSalaryService, 
     private clientService:ClientsService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    this.employeeSalary =
      this.action === 'edit'
        ? data.employeeSalary
        : new EmployeeSalary({} as EmployeeSalary);
    this.dialogTitle =
      this.action === 'edit'
        ? `Monitoring de `
        : 'Nouveau site à monitorer';
    this.employeeSalaryForm = this.createEmployeeSalaryForm();
   // this.subscribeToSalaryChanges();
  }

  // Create the form for Employee Salary
  private createEmployeeSalaryForm(): UntypedFormGroup {

   // console.log("La date",this.employeeSalaryForm.get('datemonitoring')?.value)
    return this.fb.group({
      id: [this.employeeSalary.id],
     
      url: [this.employeeSalary.url, Validators.required],
     
      statut: [this.employeeSalary.statut],
      client: [this.employeeSalary.client||null, Validators.required],
      commentaire: [this.employeeSalary.commentaire, Validators.required],
     
      dateMonitoring: [this.employeeSalary.dateMonitoring, Validators.required],

    });
  }
  loadBeneficiaireData() {
    this.clientService.getAllClients().subscribe({
      next: (data: any) => {
        // Accéder à la propriété 'contenu' de la réponse API
        this.beneficiaires = data.contenu;
        console.log(this.beneficiaires)
      
      },
      error: (err) => console.error(err),
    });
  }
  // 
  // Automatically calculate net salary when salary, bonus, or deductions change
  private subscribeToSalaryChanges(): void {
    this.employeeSalaryForm
      .get('salary')
      ?.valueChanges.subscribe(() => this.calculateNetSalary());
    this.employeeSalaryForm
      .get('bonus')
      ?.valueChanges.subscribe(() => this.calculateNetSalary());
    this.employeeSalaryForm
      .get('deductions')
      ?.valueChanges.subscribe(() => this.calculateNetSalary());
  }
ngOnInit(): void {
   
    this.loadBeneficiaireData()

    if(this.action==='edit'){
    //  const parts = this.employeeSalaryForm.get('datemonitoring')?.value.split('/');
  const parts=this.data.employeeSalary.dateMonitoring.split('/')

        const formattedDate = new Date(+parts[2], +parts[1] - 1, +parts[0]);

        console.log("formated date==> ",formattedDate)
         console.log("date==> ",this.data.employeeSalary.dateMonitoring)


        //this.employeeSalaryForm.get('dateMonitoring')?.value=formattedDate
        
       /* patchValue({
          dateMonitoring: 
        });*/

          this.employeeSalaryForm.patchValue({
            dateMonitoring: formattedDate
          });

    }
   
  }
  // Calculate net salary
  private calculateNetSalary(): void {
    const salary = this.employeeSalaryForm.get('salary')?.value || 0;
    const bonus = this.employeeSalaryForm.get('bonus')?.value || 0;
    const deductions = this.employeeSalaryForm.get('deductions')?.value || 0;
    const netSalary = salary + bonus - deductions;
    this.employeeSalaryForm.get('netSalary')?.setValue(netSalary);
  }

  // Error message handling for all fields
  getErrorMessage(controlName: string): string {
    const control = this.employeeSalaryForm.get(controlName);
    if (control?.hasError('required')) {
      return 'This field is required';
    }
    if (control?.hasError('email')) {
      return 'Not a valid email';
    }
    return '';
  }

  // Form submit logic
  submit(): void {
    if (this.employeeSalaryForm.valid) {
      const salaryData = this.employeeSalaryForm.getRawValue();

      console.log("data to update===> ",salaryData)
     
      let dateFin=''
      
         

                  if (moment.isMoment(salaryData.dateMonitoring)) {
                    dateFin = salaryData.dateMonitoring.format('DD/MM/YYYY');
                  } else if (salaryData.dateMonitoring instanceof Date) {
                    dateFin = moment(salaryData.dateMonitoring).format('DD/MM/YYYY');
                  } else if (typeof salaryData.dateMonitoring === 'string') {
                    dateFin = moment(new Date(salaryData.dateMonitoring)).format('DD/MM/YYYY');
                  }


      const data={
        dateMonitoring:dateFin,
        commentaire:salaryData.commentaire,
        statut:salaryData.statut,
        id:salaryData.id,
        url:salaryData.url,
        beneficiaire_id:salaryData.client

      }
      if (this.action === 'edit') {
        this.employeeSalaryService.updateMonitoring(data).subscribe({
          next: (response) => {
            this.dialogRef.close(response);
          },
          error: (error) => {
            console.error('Update Error:', error);
            // Optionally show an error message to the user
          },
        });
      } else {
        this.employeeSalaryService.addMonitoring(data).subscribe({
          next: (response) => {
            this.dialogRef.close(response);
          },
          error: (error) => {
            console.error('Add Error:', error);
            // Optionally show an error message to the user
          },
        });
      }
    }
  }

  // Close the dialog
  onNoClick(): void {
    this.dialogRef.close();
  }
}
