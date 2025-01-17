import { MatSortModule } from '@angular/material/sort';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ResultsService } from '../../services/results.service';

export interface DataElement {
  crypto_id?: string,
  crypto_name: string,
  value: number,
  asset: string,
  stock: number;
}

const ELEMENT_DATA: DataElement[] = [];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  userCrypto!: DataElement
  displayedColumns: string[] = ['asset', 'crypto_name', 'value', 'stock', 'amount'];

  constructor(private resultsService: ResultsService) { }

  dataSource = new MatTableDataSource<DataElement>(ELEMENT_DATA);
  customPaginatorIntl = new MatPaginatorIntl();


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSortModule) matsort!: MatSortModule

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  responseData: any;

  public chargeTableData(user_id: string) {
    this.resultsService.getRelationById(user_id).subscribe((response) => {
      this.responseData = response;
      this.dataSource.data = this.responseData
    },
      (error) => {
        console.log(error)
      }
    )
  }

  ngOnInit(): void {
    var user_id = sessionStorage.getItem('user_id')
    this.chargeTableData(user_id!)
  }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }