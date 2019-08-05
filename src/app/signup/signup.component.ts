import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Validators} from "@angular/forms";
import {AuthenticationService} from "../authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirm: new FormControl('', [Validators.required, Validators.minLength(6)]),
    first: new FormControl('', Validators.required),
    last: new FormControl('', Validators.required),
  }, {validators: this.passMatch});

  public register = {};
  private response;

  constructor(private _authService: AuthenticationService, router: Router) {
    if (this._authService.isAuthenticated()) {
      router.navigate(['home'])
    }
  }

  signUp() {
    this._authService.registerUser(this.register).subscribe((result) => {
      this.response = result;
      console.log(this.response)
    });
  }

  passMatch(group: FormGroup) {
    let pass = group.controls.password.value;
    let confirm = group.controls.confirm.value;
    return pass === confirm ? null : {notSame: true}
  }


  ngOnInit() {}

}
