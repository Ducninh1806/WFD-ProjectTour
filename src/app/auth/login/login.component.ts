import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {LoginInfo} from '../login-info';
import {AuthService} from '../service/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenStorageService} from '../service/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  loginInfo: LoginInfo;
  isLoggedId = false;
  isLoginFailed = false;
  returnUrl: string;
  roles: string[] = [];


  constructor(private tokenStorage: TokenStorageService,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';

    if (this.tokenStorage.getToken()) {
      this.isLoggedId = true;
      this.roles = this.tokenStorage.getAuthorities();
    }

  }

  reloadPage() {
    window.location.reload();
  }

  onLogin() {
    const {username, password} = this.loginForm.value;

    this.loginInfo = new LoginInfo(username, password);

    this.authService.loginAuth(this.loginInfo).subscribe(
      data => {
        this.tokenStorage.saveId(data.userId);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveEmail(data.email);
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveAuthorities(data.roles);

        this.isLoggedId = true;
        this.isLoginFailed = true;
        this.roles = this.tokenStorage.getAuthorities();
        this.router.navigateByUrl(this.returnUrl + '/user');
        console.log('login thanh cong');
      }, error => {
        this.isLoginFailed = true;
        console.log(error);
      }
    );

  }



}
