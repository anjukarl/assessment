import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  failedLogin = false;
  submitted = false;
  private authsub: Subscription = new Subscription();

  constructor(private fb: FormBuilder, public authService: AuthService) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  login() {
    this.submitted = true;
    const email = this.form.value.email;
    const password = this.form.value.password;
    this.authService.signIn(email, password);
  }

  getLogin() {
    this.authsub = this.authService.isLoggedIn$.subscribe((value) => {
      this.failedLogin = !value;
    });
  }

  ngOnDestroy() {
    this.authsub.unsubscribe();
  }

  get email() {
    return this.form.controls['email'];
  }
  get password() {
    return this.form.controls['password'];
  }
}
