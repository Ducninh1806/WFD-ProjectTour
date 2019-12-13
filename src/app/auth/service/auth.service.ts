import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {LoginInfo} from '../login-info';
import {Observable} from 'rxjs';
import {JwtResponse} from '../jwt-response';
import {SignupInfo} from '../signup-info';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'http://localhost:9000/auth/signin';
  private signUpUrl =  'http://localhost:9000/auth/signup';

  constructor(private http: HttpClient) { }

  loginAuth(loginInfo: LoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, loginInfo);
  }

  signUp(signUp: SignupInfo): Observable<string> {
    return this.http.post<string>(this.signUpUrl, signUp);
  }
}
