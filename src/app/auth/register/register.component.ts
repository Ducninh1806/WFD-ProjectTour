import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {SignupInfo} from '../signup-info';
import {AuthService} from '../service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    name: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    cpassword: new FormControl('')
  });

  signup: SignupInfo;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  onRegister() {
    const {name , username, email, password, cpassword} = this.registerForm.value;

    const form: SignupInfo = {roles: ['user'], name, username, email, password};
    console.log(form);
    if (password === cpassword) {
      this.authService.signUp(form).subscribe(
        data => {

          console.log('Susseccfully register');
          this.router.navigate(['/login']);
        }, error => {
          console.log(error);
        }
      );
    }

  }


}
