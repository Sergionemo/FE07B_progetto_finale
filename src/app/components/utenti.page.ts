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
    <nav
      aria-label="Page navigation"
      class="d-flex justify-content-center mb-3"
    >
      <ul class="pagination mt-3">
        <li class="page-item" *ngIf="!response.first">
          <a class="myBtn" (click)="cambiaPag(response.number - 1)"
            ><i class="bi bi-arrow-left"></i
          ></a>
        </li>
        <li class="page-item" *ngFor="let pag of numP; let p = index">
          <a class="myBtn" (click)="cambiaPag(p)">{{ p + 1 }}</a>
        </li>
        <li class="page-item" *ngIf="!response.last">
          <a class="myBtn" (click)="cambiaPag(response.number + 1)"
            ><i class="bi bi-arrow-right"></i
          ></a>
        </li>
      </ul>
    </nav>
  `,
  styles: [
    `
      a {
        cursor: pointer;
        text-decoration: none;
      }
      .myBtn {
        margin: 0;
        border-radius: 0;
      }
    `,
  ],
})
export class UtentiPage implements OnInit {
  constructor(private authSrv: AuthService) {}

  utenti!: Array<User>;
  response!: any;
  pagCorr: any;
  numP: any;

  ngOnInit() {
    this.authSrv.getAll(0).subscribe((c) => {
      this.response = c;
      console.log(this.response);
      this.utenti = this.response.content;
      const numP = Array(this.response.totalPages);
      this.numP = numP;
    });
  }

  cambiaPag(page: number) {
    this.authSrv.getAll(page).subscribe((c) => {
      console.log(page);
      // console.log(c);
      this.response = c;
      this.utenti = this.response.content;
      this.pagCorr = page;
      // console.log(this.pagCorr);
    });
  }
}
