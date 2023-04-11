import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultsComponent } from './results.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { TableComponent } from '../../components/table/table.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { PurchaseDialogComponent } from '../../components/purchase-dialog/purchase-dialog.component';
import { SalesDialogComponent } from '../../components/sales-dialog/sales-dialog.component';


@NgModule({
  declarations: [
    ResultsComponent, NavbarComponent, TableComponent, PurchaseDialogComponent, SalesDialogComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    MatSortModule
  ],
  exports: [
    ResultsComponent
  ]
})
export class ResultsModule { }