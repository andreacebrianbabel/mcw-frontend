import { Relation } from './../models/relation-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/auth/models/user-model';
import { CryptoData } from '../models/crypto-model';
import { DataElement } from '../components/table/table.component';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  constructor(private http: HttpClient) { }

  getUserById(user_id: string): Observable<User> {
    return this.http.get<User>('/api/users/get/' + user_id)
  }

  getAllCryptos(): Observable<CryptoData[]> {
    return this.http.get<CryptoData[]>('/api/crypto/all')
  }

  getRelationById(user_id: string): Observable<Relation[]> {
    return this.http.get<Relation[]>('/api/relation/get/' + user_id)
  }

  updateRelationById(user_id: string, crypto_id: string, amount: number): Observable<Relation> {
    return this.http.patch<Relation>('/api/relation/patch/', {user_id, crypto_id, amount})
  }

  getCryptoById(crypto_id: string): Observable<DataElement> {
    return this.http.get<DataElement>('api/crypto/get/' + crypto_id)
  }

  updateCryptoById(crypto_id: string, crypto_name: string, value: number, asset: string, stock: number): Observable<CryptoData> {
    return this.http.patch<CryptoData>('api/crypto/patch/', {crypto_id, crypto_name, value, asset, stock})
  }

  // SERVICIO PARA TRAER EL USUARIO QUE HACE LA COMPRA Y COGER EL DEPOSIT

  // SERVICIO PARA ACTUALIZAR EL DEPOSIT DEL USUARIO
}