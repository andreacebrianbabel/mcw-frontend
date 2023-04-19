import { DataElement } from './../table/table.component';
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
  matchingCryptos: Relation[]
  cryptoToPurchase: DataElement
  oldAmount: number[]
  newAmount: number
  updatedAmount: number
  prohibitionPurchase: boolean = false
  cryptoStock: number

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

  getRelationById() {
    this.resultsService.getRelationById(this.userId).subscribe(
      (relation) => {
        this.cryptoToPurchase = this.cryptoPurchase.get('crypto')?.value.crypto_id

        this.matchingCryptos = relation.filter(element => element.crypto_id === this.cryptoToPurchase.crypto_id)

        this.newAmount = this.cryptoPurchase.get('crypto_quantity')?.value

        if (this.matchingCryptos.length > 0) {
          this.oldAmount = this.matchingCryptos.map(element => element.amount)

          this.updatedAmount = this.oldAmount[0] + this.newAmount

          console.log("holaaaa", this.updatedAmount)
        } else {
          this.updatedAmount = this.newAmount

          console.log("adiossssssssss", this.updatedAmount)

        }

        this.updateRelation(this.updatedAmount)
      },
      (error) => {
        console.log(error)
      }
    )
  }

  getCryptoById() {
    let cryptoId = this.cryptoPurchase.get('crypto')?.value.crypto_id

    this.resultsService.getCryptoById(cryptoId).subscribe(
      (crypto) => {
        this.cryptoStock = Number(crypto.stock)

        this.updateCryptoStock(this.cryptoStock)
      },
      (error) => {
        console.log(error)
      }
    )
  }

  getUserById() {
    this.resultsService.getUserById(this.userId).subscribe(
      (user) => {
        let deposit = user.deposit

        if (this.totalPurchasePrice > deposit) {
          this.prohibitionPurchase = true
          this.openPurchaseProhibitionBar()
        } else {
          this.prohibitionPurchase = false
          let newDeposit: number = Number((deposit - this.totalPurchasePrice).toFixed(3))
          this.updateUserDeposit(user.username, user.fullname, user.email, user.password, newDeposit)
        }
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
      },
      (error) => {
        console.log(error)
      }
    )
  }

  updateCryptoStock(cryptoStock: number) {
    let cryptoId = this.cryptoPurchase.get('crypto')?.value.crypto_id
    let cryptoName = this.cryptoPurchase.get('crypto')?.value.crypto_name
    let cryptoValue = this.cryptoPurchase.get('crypto')?.value.value
    let cryptoAsset = this.cryptoPurchase.get('crypto')?.value.asset
    let stockPurchased = this.cryptoPurchase.get('crypto_quantity')?.value
    cryptoStock = cryptoStock - stockPurchased

    this.resultsService.updateCryptoById(cryptoId, cryptoName, cryptoValue, cryptoAsset, cryptoStock).subscribe(
      (stock) => { },
      (error) => {
        console.log(error)
      }
    )
  }

  updateUserDeposit(username: string, fullname: string, email: string, password: string, newDeposit: number) {
    this.resultsService.updateUserById(this.userId, username, fullname, email, password, newDeposit).subscribe(
      (deposit) => { },
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

        this.getUserById()

        return this.totalPurchasePrice
      }
    )
  }

  closePurchaseDialog() {
    this.getCryptoById()
    this.getRelationById()
    window.location.reload()
  }

  openPurchaseBar() {
    this.snackbar.open('¡La compra se ha realizado exitosamente!', '', {
      duration: 2500
    })
  }

  openPurchaseProhibitionBar() {
    this.snackbar.open('El importe total no puede superar tu saldo', '', {
      duration: 1500
    })
  }
}