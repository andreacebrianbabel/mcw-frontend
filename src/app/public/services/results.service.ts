import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/auth/models/user-model';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  constructor(private http: HttpClient) {}

  getUserById(user_id: string): Observable<User> {
    return this.http.get<User>('/api/users/get/'+ user_id)
  }

  getRelationById(user_id: string): Observable<User> {
    return this.http.get<User>('/api/relation/get/'+ user_id)
  }
}
