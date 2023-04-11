import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PurchaseDialogComponent } from '../../components/purchase-dialog/purchase-dialog.component';
import { User } from 'src/app/auth/models/user-model';
import { SalesDialogComponent } from '../../components/sales-dialog/sales-dialog.component';
@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  user: User

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openPurchaseDialog() {
    this.dialog.open(PurchaseDialogComponent, {
      data: { user: this.user }
    })
  }

  openSalesDialog() {
    this.dialog.open(SalesDialogComponent, {
      data: { user: this.user }
    })
  }
}
