import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {

  loginForm: FormGroup;
  registerForm: FormGroup;

  showLogin: boolean = true;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
  ) {

    this.loginForm = this._fb.group({
      email: [, [Validators.required, Validators.email]],
      password: [, [Validators.required]]
    })

    this.registerForm = this._fb.group({
      email: [, [Validators.required, Validators.email]],
      password: [, [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  toggleLoginRegister() {

    this.showLogin = !this.showLogin

    if (this.showLogin) {
      document.getElementById('loginForm')?.removeAttribute("hidden")
      document.getElementById('registerForm')?.setAttribute("hidden", 'true')
    } else {
      document.getElementById('loginForm')?.setAttribute("hidden", 'true')
      document.getElementById('registerForm')?.removeAttribute("hidden")
    }

  }
}
