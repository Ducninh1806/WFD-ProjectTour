import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IUser} from '../info/i-user';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUseUrl = 'http://localhost:9000/users';

  constructor( private http: HttpClient) { }

  getListUser(): Observable <IUser[]> {
    return this.http.get<IUser[]>(this.apiUseUrl);
  }

  getIdUser(id: number): Observable<IUser> {
    return this.http.get<IUser>(this.apiUseUrl + '/' + id);
  }

  deleteUser(id: any): Observable<any> {
    return this.http.delete(this.apiUseUrl + '/' + id);
  }
}
