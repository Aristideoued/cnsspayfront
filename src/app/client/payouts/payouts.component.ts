import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatMenuTrigger, MatMenuModule } from '@angular/material/menu';
import { Subject } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { rowsAnimation } from '@shared';
import { Direction } from '@angular/cdk/bidi';
import { TableExportUtil } from '@shared';
import { CommonModule, NgClass } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRippleModule } from '@angular/material/core';
import { FeatherIconsComponent } from '@shared/components/feather-icons/feather-icons.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Payout } from 'app/admin/payroll/employee-salary/payout.model';
import { EmployeeSalaryService } from 'app/admin/payroll/employee-salary/employee-salary.service';
import { EmployeeSalary } from 'app/admin/payroll/employee-salary/employee-salary.model';
import { EmployeeSalaryFormComponent } from 'app/admin/payroll/employee-salary/dialogs/form-dialog/form-dialog.component';
import { EmployeeSalaryDeleteComponent } from 'app/admin/payroll/employee-salary/dialogs/delete/delete.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EmployeesService } from 'app/admin/employees/allEmployees/employees.service';
@Component({
  selector: 'app-payouts',
    animations: [rowsAnimation],
     imports: [
        BreadcrumbComponent,
         FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatTooltipModule,
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        MatSortModule,
        NgClass,
        CommonModule,
        MatCheckboxModule,
        FeatherIconsComponent,
        MatRippleModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        MatMenuModule,
        MatPaginatorModule
        
    ],
  templateUrl: './payouts.component.html',
  styleUrl: './payouts.component.scss'
})
export class PayoutsComponent implements OnInit, OnDestroy{
 columnDefinitions = [
    { def: 'select', label: 'Checkbox', type: 'check', visible: true },
    { def: 'id', label: ' ID', type: 'text', visible: false },
    { def: 'plateformeNom', label: 'Plateforme', type: 'text', visible: true },
    { def: 'montant', label: 'Montant', type: 'text', visible: true },
    { def: 'date', label: 'Date', type: 'text', visible: true },

    { def: 'heure', label: 'Heure', type: 'text', visible: true },
    { def: 'plateformeId', label: 'Plateforme id', type: 'text', visible: false },
   
   // { def: 'actions', label: 'Actions', type: 'actionBtn', visible: true },
  ];

  dataSource = new MatTableDataSource<Payout>([]);
  selection = new SelectionModel<Payout>(true, []);
  contextMenuPosition = { x: '0px', y: '0px' };
  isLoading = false;
  employeeSalaryForm: UntypedFormGroup;
   plateformes :any
  totalHT:any=0
  totalTTC:any=0
  private destroy$ = new Subject<void>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('filter') filter!: ElementRef;
  @ViewChild(MatMenuTrigger) contextMenu?: MatMenuTrigger;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    private router: Router,
    public employeeSalaryService: EmployeeSalaryService,
    private snackBar: MatSnackBar, 
    public employeesService: EmployeesService,
    private fb: UntypedFormBuilder
  ) {  this.employeeSalaryForm = this.createEmployeeSalaryForm();
}

  ngOnInit() {

    
       //this.loadData();
       this.loadPlateforme()
   
   
  }
  private createEmployeeSalaryForm(): UntypedFormGroup {

   // console.log("La date",this.employeeSalaryForm.get('datemonitoring')?.value)
    return this.fb.group({
     
      plateformeId: [''],
     
      

    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  refresh() {
    this.loadPlateforme();
  }
  loadPlateforme() {
     this.employeesService.getPlateformeByUserId().subscribe({
       next: (data:any) => {
         this.plateformes = data;
         
         
         
       },
       error: (err) => console.error(err),
     });
   }
  getDisplayedColumns(): string[] {
    return this.columnDefinitions
      .filter((cd) => cd.visible)
      .map((cd) => cd.def);
  }
  downloadCall() {
    this.router.navigateByUrl('admin/payroll/payslip');
  }


  formatCellValue(row: any, def: string): string {
  if (def === 'date' && row['date']) {
    return new Date(row['date']).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  if (def === 'heure' && row['heure']) {
    return row['heure'].substring(0, 8);
  }

  return row[def];
}


    monitoring() {
    this.employeeSalaryService.startMonitoring().subscribe({
      next: (data:any) => {
        

        console.log(data.contenu)
       
       
      },
      error: (err) => console.error(err),
    });
  }

  loadData(idPlateforme:string) {
    this.employeeSalaryService.getAllPayoutByPlateforme(idPlateforme).subscribe({
      next: (data:any) => {
        this.dataSource.data = data.payouts;
        this.totalHT=data.totalMontantPayouts
        this.totalTTC=data.totalMontantPayoutsTTC

        console.log(this.dataSource.data)
        this.isLoading = false;
        this.refreshTable();
        this.dataSource.filterPredicate = (
          data: Payout,
          filter: string
        ) =>
          Object.values(data).some((value) =>
            value.toString().toLowerCase().includes(filter)
          );
      },
      error: (err) => console.error(err),
    });
  }

  private refreshTable() {
    this.paginator.pageIndex = 0;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.dataSource.filter = filterValue;
  }

  addNew() {
    this.openDialog('add');
  }

  editCall(row: EmployeeSalary) {
    this.openDialog('edit', row);
  }

  openDialog(action: 'add' | 'edit', data?: EmployeeSalary) {
    let varDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      varDirection = 'rtl';
    } else {
      varDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(EmployeeSalaryFormComponent, {
      width: '60vw',
      maxWidth: '100vw',
      data: { employeeSalary: data, action },
      direction: varDirection,
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (action === 'add') {
          this.dataSource.data = [result, ...this.dataSource.data];
        } else {
          this.updateRecord(result);
        }
        this.refreshTable();
        this.showNotification(
          action === 'add' ? 'snackbar-success' : 'black',
          `${action === 'add' ? 'Add' : 'Edit'} Record Successfully...!!!`,
          'bottom',
          'center'
        );
      }
    });
  }

  private updateRecord(updatedRecord: Payout) {
    const index = this.dataSource.data.findIndex(
      (record) => record.id === updatedRecord.id
    );
    if (index !== -1) {
      this.dataSource.data[index] = updatedRecord;
      this.dataSource._updateChangeSubscription();
    }
  }

  deleteItem(row: Payout) {
    const dialogRef = this.dialog.open(EmployeeSalaryDeleteComponent, {
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataSource.data = this.dataSource.data.filter(
          (record) => record.id !== row.id
        );
        this.refreshTable();
        this.showNotification(
          'snackbar-danger',
          'Delete Record Successfully...!!!',
          'bottom',
          'center'
        );
      }
    });
  }

  showNotification(
    colorName: string,
    text: string,
    placementFrom: MatSnackBarVerticalPosition,
    placementAlign: MatSnackBarHorizontalPosition
  ) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  exportExcel() {
    const exportData = this.dataSource.filteredData.map((x) => ({
      'Plateforme': x.plateformeNom,
      Date: x.date,
      Heure: x.heure,
      Montant: x.montant,
    
      
    }));

    TableExportUtil.exportToExcel(exportData, 'employee_payslip_export');
  }

  isAllSelected() {
    return this.selection.selected.length === this.dataSource.data.length;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  removeSelectedRows() {
    const totalSelect = this.selection.selected.length;
    this.dataSource.data = this.dataSource.data.filter(
      (item) => !this.selection.selected.includes(item)
    );
    this.selection.clear();
    this.showNotification(
      'snackbar-danger',
      `${totalSelect} Record(s) Deleted Successfully...!!!`,
      'bottom',
      'center'
    );
  }
  onContextMenu(event: MouseEvent, item: Payout) {
    event.preventDefault();
    this.contextMenuPosition = {
      x: `${event.clientX}px`,
      y: `${event.clientY}px`,
    };
    if (this.contextMenu) {
      this.contextMenu.menuData = { item };
      this.contextMenu.menu?.focusFirstItem('mouse');
      this.contextMenu.openMenu();
    }
  }
}
