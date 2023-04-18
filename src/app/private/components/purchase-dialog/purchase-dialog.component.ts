import { Relation } from './../../models/relation-model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CryptoData } from '../../models/crypto-model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResultsService } from '../../services/results.service';
import { DataElement } from '../table/table.component';

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
  cryptosOfUser: Relation[]
  matchingCryptos: Relation[]
  quantityToPurchase: string
  cryptoToPurchase: DataElement
  cryptoQuantity: number
  oldAmount: number[]
  newAmount: number
  updatedAmount: number


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

  // Busco las criptomonedas que tiene el usuario y si la criptomoneda de compra coincide con alguna de las que ya tenía

  getRelationById() {
    this.resultsService.getRelationById(this.userId).subscribe(
      (relation) => {
        this.cryptoToPurchase = this.cryptoPurchase.get('crypto')?.value

        this.matchingCryptos = relation.filter(element => element.crypto_id === this.cryptoToPurchase.crypto_id)

        if (!!this.matchingCryptos){
          this.oldAmount = this.matchingCryptos.map(element => element.amount)
          this.newAmount = this.cryptoPurchase.get('crypto_quantity')?.value

           this.updatedAmount = this.oldAmount[0] + this.newAmount
        }

        this.updateRelation(this.updatedAmount)
      },
      (error) => {
        console.log(error)
      }
    )
  }

  updateRelation(updatedAmount: number) {
    let cryptoId = this.cryptoPurchase.get('crypto')?.value.crypto_id

    this.resultsService.updateRelationById(this.userId, cryptoId, updatedAmount).subscribe(
      (relation) => {
        console.log("final", relation)
      },
      (error) => {
        console.log(error)
      }
    )
  }

  transactionPurchase() {
    this.getRelationById()
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