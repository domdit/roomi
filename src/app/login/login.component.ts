import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private _authService: AuthenticationService, public router: Router) {
    if (this._authService.isAuthenticated()) {
      router.navigate(['home'])
    }
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  public login = {};
  private response;

  logIn() {
    this._authService.loginUser(this.login).subscribe((result => {
      this.response = result;
      localStorage.setItem('id_token', this.response.jwt);
      console.log(this.response)
    }))
  }

  ngOnInit() {}

}
