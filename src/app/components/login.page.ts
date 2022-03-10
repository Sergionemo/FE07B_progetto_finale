import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';

@Component({
  template: `
    <form #form="ngForm" (ngSubmit)="login(form)">
      <div class="mb-3">
        <label for="username">Username *</label>
        <input
          type="text"
          id="username"
          class="form-control"
          ngModel
          name="username"
        />
      </div>
      <div class="mb-3">
        <label for="password">Password *</label>
        <input
          type="password"
          id="password"
          class="form-control"
          ngModel
          name="password"
        />
      </div>
      <div>
        <button type="submit" class="btn btn-success">Log in</button>
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
export class LoginPage implements OnInit {
  constructor(private authSrv: AuthService, private router: Router) {}

  item!: any;
  users!: User;

  ngOnInit(): void {}

  login(form: NgForm) {
    console.log(form.value);
    this.item = form.value;
    this.authSrv.login(this.item).subscribe((res) => {
      console.log(res);
      this.users = res;
      localStorage.setItem('utente', JSON.stringify(this.users));
      this.router.navigate(['/utenti']);
    });
  }
}
