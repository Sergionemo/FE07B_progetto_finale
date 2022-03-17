import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';

@Component({
  template: `
    <form #form="ngForm">
      <div class="mb-3">
        <label for="username">Username *</label>
        <input
          type="text"
          id="username"
          class="form-control"
          [(ngModel)]="form.value.username"
          name="username"
        />
      </div>
      <div class="mb-3">
        <label for="email">Email *</label>
        <input
          type="email"
          id="email"
          class="form-control"
          [(ngModel)]="form.value.email"
          name="email"
        />
      </div>
      <div class="mb-3">
        <label for="password">Password *</label>
        <input
          type="password"
          id="password"
          class="form-control"
          [(ngModel)]="form.value.password"
          name="password"
        />
      </div>
      <div class="mb-3">
        <label for="tipoUtente">Scegli tipo utente:</label>
        <select
          class="form-select"
          aria-label="Default select example"
          id="tipoUtente"
          [(ngModel)]="form.value.role"
          name="tipoUtente"
        >
          <option value="admin">admin</option>
          <option value="user">user</option>
        </select>
      </div>
      <div>
        <button
          type="button"
          class="btn btn-success"
          (click)="signup(form.value)"
        >
          Sign Up
        </button>
      </div>
    </form>
  `,
  styles: [
    `
      form {
        margin: 10vh 40vw;
      }
    `,
  ],
})
export class SignupPage implements OnInit {
  user = {
    username: "",
    email: "",
    password: "",
    role: []
  };
  constructor(private authSrv: AuthService, private router: Router) {}

  ngOnInit(): void {}

  signup(form: { username: string; email: string; password: string; roles: any;}) {
    const r = Array();
    r.push(form.roles);
    this.user.username = form.username;
    this.user.email = form.email;
    this.user.password = form.password;
    this.user.role = r[0];

    this.authSrv.signup(this.user).subscribe((res) => {
      console.log(res);
      this.router.navigate(['/login']);
    });
    // console.log(this.user);
  }
}
