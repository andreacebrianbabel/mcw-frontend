import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultsComponent } from './results.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { TableComponent } from '../../components/table/table.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ResultsComponent, NavbarComponent, TableComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    FormsModule
  ],
  exports: [
    ResultsComponent
  ]
})
export class ResultsModule { }
