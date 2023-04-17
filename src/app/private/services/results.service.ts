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

  // SERVICIO PARA LOS DATOS DE LA TABLA Y PARA COMPROBAR QUE LA CRIPTOMONEDA QUE SE COMPRA LA TIENE EL USUARIO O NO
  getRelationById(user_id: string): Observable<DataElement[]> {
    return this.http.get<DataElement[]>('/api/relation/get/' + user_id)
  }

  // SERVICIO PARA ACTUALIZAR EL AMOUNT DE LA TABLA CUANDO EL USUARIO YA TIENE ESA CRYPTOMONEDA
  updateRelationById(user_id: string, crypto_id: string, amount: number): Observable<Relation[]> {
    return this.http.patch<Relation[]>('/api/relation/patch/', { user_id, crypto_id, amount })
  }

  // SERVICIO PARA CREAR UNA NUEVA ENTRADA EN LA TABLA DE RELATION PARA CREAR LA CRIPTOMONEDA QUE HA COMPRADO EL USUARIO

  // SERVICIO PARA TRAER LA CRIPTOMONEDA EN SÍ QUE SE HA COMPRADO Y COGER EL STOCK
  getCryptoById(crypto_id: string, user_id: string): Observable<Relation> {
    return this.http.get<Relation>('api/relation/get/' + crypto_id + "/" + user_id)
  }

  // SERVICIO PARA ACTUALIZAR EL STOCK DE LA CRIPTOMONEDA COMPRADA

  // SERVICIO PARA TRAER EL USUARIO QUE HACE LA COMPRA Y COGER EL DEPOSIT

  // SERVICIO PARA ACTUALIZAR EL DEPOSIT DEL USUARIO



}