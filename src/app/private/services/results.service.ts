import { Relation } from './../models/relation-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/auth/models/user-model';
import { CryptoData } from '../models/crypto-model';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  constructor(private http: HttpClient) { }

  getUserById(user_id: string): Observable<User> {
    return this.http.get<User>('/api/users/get/' + user_id)
  }

  getRelationById(user_id: string): Observable<User> {
    return this.http.get<User>('/api/relation/get/' + user_id)
  }

  getAllCryptos(): Observable<CryptoData[]> {
    return this.http.get<CryptoData[]>('/api/crypto/all')
  }

  updateRelationAmountById(newRelation: Relation): Observable<Relation> {
    return this.http.put<Relation>('/api/relation/update', { newRelation })
  }

  getCryptoById(crypto_id: string, user_id: string): Observable<Relation> {
    return this.http.get<Relation>('api/relation/get/' + crypto_id + "/" + user_id)
  }
}