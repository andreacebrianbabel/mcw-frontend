import { Relation } from './../../models/relation-model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CryptoData } from '../../models/crypto-model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResultsService } from '../../services/results.service';

@Component({
  selector: 'app-purchase-dialog',
  templateUrl: './purchase-dialog.component.html',
  styleUrls: ['./purchase-dialog.component.scss']
})
export class PurchaseDialogComponent implements OnInit {

  constructor(public fb: FormBuilder, private resultsService: ResultsService, private snackbar: MatSnackBar) { }

  public cryptoPurchase = this.fb.group({
    crypto: ['', Validators.required],
    crypto_quantity: ['', Validators.required]
  })

  cryptos: CryptoData[]
  totalPurchasePrice: number
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

    this.cryptoPurchase.get('crypto_quantity')?.valueChanges.subscribe(
      (value: number) => {
        const cryptoType = this.cryptoPurchase.get('crypto')?.value.crypto_id
        const price = this.cryptos.find(element => element.crypto_id === cryptoType)?.value

        this.totalPurchasePrice = Number((price! * value).toFixed(3))
      }
    )
  }

  openPurchaseBar() {
    this.snackbar.open('¡La compra se ha realizado exitosamente!', '', {
      duration: 2500
    })
  }
}