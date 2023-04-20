import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ResultsService } from '../../services/results.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CryptoData } from '../../models/crypto-model';
import { Relation } from '../../models/relation-model';
import { DataElement } from '../table/table.component';

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
  matchingCryptos: Relation[]
  cryptoToSale: DataElement
  oldAmount: number[]
  newAmount: number
  updatedAmount: number
  prohibitionSale: boolean = false
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
        this.cryptos = relation

        this.cryptoToSale = this.cryptoSale.get('crypto')?.value

        this.matchingCryptos = relation.filter(element => element.crypto_id === this.cryptoToSale.crypto_id)

        this.newAmount = this.cryptoSale.get('crypto_quantity')?.value
        this.oldAmount = this.matchingCryptos.map(element => element.amount)

        if (this.matchingCryptos.length > 0) {
          this.updatedAmount = this.oldAmount[0] - this.newAmount
        } else {
          this.updatedAmount = this.newAmount
        }

        if (this.newAmount > relation[0].amount) {
          this.prohibitionSale = true
          this.openSaleProhibitionBar()
        } else {
          this.prohibitionSale = false
        }


        if (this.updatedAmount > 0) {
          this.updateRelation(this.updatedAmount)
        } else if(this.updatedAmount == 0){
          console.log(this.updatedAmount)
          this.deleteRelation()
        }
      },
      (error) => {
        console.log(error)
      }
    )
  }

  getCryptoById() {
    let cryptoId = this.cryptoSale.get('crypto')?.value.crypto_id

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

        let newDeposit: number = Number((deposit + this.totalSalePrice).toFixed(4))
        this.updateUserDeposit(user.username, user.fullname, user.email, user.password, newDeposit)
      },
      (error) => {
        console.log(error)
      }
    )
  }

  updateRelation(updatedAmount: number) {
    let cryptoId = this.cryptoSale.get('crypto')?.value.crypto_id

    this.resultsService.updateRelationById(this.userId, cryptoId, updatedAmount).subscribe(
      (relation) => { },
      (error) => {
        console.log(error)
      }
    )
  }

  deleteRelation() {
    let cryptoId = this.cryptoSale.get('crypto')?.value.crypto_id
    this.resultsService.deleteRelationById(this.userId, cryptoId).subscribe(
      (result) => {
      },
      (error) => {
        console.log(error)
      }
    )
  }

  updateCryptoStock(cryptoStock: number) {
    let cryptoId = this.cryptoSale.get('crypto')?.value.crypto_id
    let cryptoName = this.cryptoSale.get('crypto')?.value.crypto_name
    let cryptoValue = this.cryptoSale.get('crypto')?.value.value
    let cryptoAsset = this.cryptoSale.get('crypto')?.value.asset
    let stockSale = this.cryptoSale.get('crypto_quantity')?.value
    cryptoStock = cryptoStock + stockSale

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

  transactionSale() {
    this.getRelationById()
  }

  ngOnInit(): void {
    if (!!this.userIdSS)
      this.userId = this.userIdSS

    this.getAllCryptos()

    this.cryptoSale.get('crypto_quantity')?.valueChanges.subscribe(
      (value: number) => {
        const cryptoType = this.cryptoSale.get('crypto')?.value.crypto_id
        const price = this.cryptos.find(element => element.crypto_id === cryptoType)?.value

        this.totalSalePrice = Number((price! * value).toFixed(4))

        this.getUserById()

        return this.totalSalePrice
      }
    )
  }

  closeSaleDialog() {
    this.getCryptoById()
    this.getRelationById()
    window.location.reload()
  }

  openSaleBar() {
    this.snackbar.open('¡La venta se ha realizado exitosamente!', '', {
      duration: 2500
    })
  }

  openSaleProhibitionBar() {
    this.snackbar.open('No puedes vender más unidades de las que tienes', '', {
      duration: 1500
    })
  }
}