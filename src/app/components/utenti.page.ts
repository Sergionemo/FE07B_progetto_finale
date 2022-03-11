import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';

@Component({
  template: `
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Username</th>
          <th scope="col">Email</th>
          <th scope="col">Roles</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let utente of utenti; let i = index">
          <th scope="row">{{ utente.id }}</th>
          <td>{{ utente.username }}</td>
          <td>{{ utente.email }}</td>
          <td *ngFor="let item of utente.roles">{{ item.roleName }}</td>
        </tr>
      </tbody>
    </table>
  `,
  styles: [],
})
export class UtentiPage implements OnInit {
  constructor(private authSrv: AuthService) {}

  utenti!: Array<User>;

  async ngOnInit() {
    this.authSrv.getAll().subscribe(c => {
      this.utenti = c.content
    });
  }
}
