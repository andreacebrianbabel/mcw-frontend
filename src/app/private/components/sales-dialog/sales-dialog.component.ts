import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ResultsService } from '../../services/results.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CryptoData } from '../../models/crypto-model';
import { Relation } from '../../models/relation-model';

@Component({
  selector: 'app-sales-dialog',
  templateUrl: './sales-dialog.component.html',
  styleUrls: ['./sales-dialog.component.scss']
})
export class SalesDialogComponent implements OnInit {

  constructor(public fb: FormBuilder, private resultsService: ResultsService, private snackbar: MatSnackBar) { }

  public cryptoSale = this.fb.group({
    crypto: ['', Validators.required],
    crypto_quantity: ['', Validators.required]
  })

  cryptos: CryptoData[]
  totalSalePrice: number
  userId = '0'
  userIdSS = sessionStorage.getItem('user_id')
  newRelation: Relation

  getAllCryptos() {
    this.resultsService.getAllCryptos().subscribe(
      (crypto) => {
        this.cryptos = crypto
      },
      (error) => {
        console.log(error)
      }
    )
  }

  ngOnInit(): void {
    if (!!this.userIdSS)
      this.userId = this.userIdSS
    this.getAllCryptos()

    this.cryptoSale.get('crypto_quantity')?.valueChanges.subscribe(
      (value: number) => {
        const cryptoType = this.cryptoSale.get('crypto')?.value.crypto_id
        const price = this.cryptos.find(element => element.crypto_id === cryptoType)?.value

        this.totalSalePrice = Number((price! * value).toFixed(3))
      }
    )
  }

  openSaleBar() {
    this.snackbar.open('¡La venta se ha realizado exitosamente!', '', {
      duration: 2500
    })
  }
}