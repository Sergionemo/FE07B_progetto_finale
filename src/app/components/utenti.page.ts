import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

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
        <tr>
          <th scope="row"></th>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <th scope="row"></th>
          <td colspan="2"></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  `,
  styles: [],
})
export class UtentiPage implements OnInit {
  constructor(private authSrv: AuthService) {}

  ngOnInit(): void {
    this.authSrv.getAll();
  }
}
