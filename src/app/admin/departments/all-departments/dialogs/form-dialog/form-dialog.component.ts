import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogContent,
  MatDialogClose,
} from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { DepartmentService } from '../../department.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Department } from '../../department.model';
import { MAT_DATE_LOCALE, MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EmployeesService } from 'app/admin/employees/allEmployees/employees.service';
import { CommonModule } from '@angular/common';

export interface DialogData {
  id: number;
  action: string;
  department: Department;
}

@Component({
    selector: 'app-departments-form',
    templateUrl: './form-dialog.component.html',
    styleUrls: ['./form-dialog.component.scss'],
    providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
    imports: [
        MatButtonModule,
        MatIconModule,
        MatDialogContent,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatOptionModule,
        MatInputModule,
        MatDialogClose,
        CommonModule
    ],
})
export class DepartmentsFormComponent {
  action: string;
  dialogTitle: string;
  departmentForm: UntypedFormGroup;
  department: Department;
  employes: any;

  constructor(
    public dialogRef: MatDialogRef<DepartmentsFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public departmentService: DepartmentService,
     private employeService:EmployeesService,
    private fb: UntypedFormBuilder
  ) {
    // Set action and department data
    this.action = data.action;
    this.dialogTitle =
      this.action === 'edit'
        ? data.department.nom
        : 'New Department';
    this.department =
      this.action === 'edit'
        ? data.department
        : new Department({} as Department);

    // Create form
    this.departmentForm = this.createDepartmentForm();
  }

ngOnInit(){
  this.loadEmployeData()
}
    loadEmployeData() {
      this.employeService.getAllEmployees().subscribe({
        next: (data:any) => {
          
          this.employes = data.contenu;
        
        },
        error: (err) => console.error(err),
      });
    }
  // Create form group for department fields with validation
  createDepartmentForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.department.id],
    
      department_name: [this.department.nom, [Validators.required]],
    
    });
  }

  /*  hod: [this.department.chefDepartement, [Validators.required]],
      phone: [this.department.telephone, [Validators.required]],
      email: [
        this.department.mail,
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      employee_capacity: [
        this.department.employee_capacity,
        [Validators.required],
      ],
      establishedYear: [this.department.establishedYear, [Validators.required]],
      totalEmployees: [this.department.totalEmploye, [Validators.required]],*/

  // Handle form validation errors for user feedback
  getErrorMessage(control: UntypedFormControl): string {
    if (control.hasError('required')) {
      return 'This field is required';
    }
    if (control.hasError('email')) {
      return 'Invalid email format';
    }
    return '';
  }

  // Submit form data
  submit(): void {
   


    if (this.departmentForm.valid) {
      const formData = this.departmentForm.getRawValue();
      console.log("form data==",formData)
      if (this.action === 'edit') {
        this.departmentService.updateDepartment(formData).subscribe({
          next: (response) => {
            this.dialogRef.close(response);
          },
          error: (error) => {
            console.error('Update Error:', error);
          },
        });
      } else {
        this.departmentService.addDepartment(formData).subscribe({
          next: (response) => {
            this.dialogRef.close(response);
          },
          error: (error) => {
            console.error('Add Error:', error);
          },
        });
      }
    }
  }

  // Close the dialog without submitting
  onNoClick(): void {
    this.dialogRef.close();
  }

  // Confirm and add the department
  public confirmAdd(): void {
    this.submit();
  }
}
