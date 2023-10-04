import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private _route: Router) {}

  token: any;
  loginForm!: FormGroup;
  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
    });
  }

  get emailValidation() {
    return this.loginForm.controls['email'].valid;
  }
  get passwordValidation() {
    return this.loginForm.controls['password'].valid;
  }

  login() {
    if (this.loginForm.valid) {
      this.authService.login(this.token);
      this._route.navigate(['cart']);
    }
  }
}
