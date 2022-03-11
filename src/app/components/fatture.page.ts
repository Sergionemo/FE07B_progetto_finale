import { Component, OnInit } from '@angular/core';
import { Fattura } from '../models/fattura';
import { FatturaService } from '../services/fattura.service';

@Component({
  template: `
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Data</th>
          <th scope="col">Numero</th>
          <th scope="col">Anno</th>
          <th scope="col">Importo</th>
          <th scope="col">Stato</th>
          <th scope="col">Cliente</th>
        </tr>
      </thead>
      <tbody *ngFor="let fattura of fatture; let i = index">
        <tr>
          <th scope="row">{{ fattura.id }}</th>
          <td>{{ fattura.data | date }}</td>
          <td>{{ fattura.numero }}</td>
          <td>{{ fattura.anno }}</td>
          <td>{{ fattura.importo }}€</td>
          <td>{{ fattura.stato.nome }}</td>
          <td>{{ fattura.cliente.ragioneSociale }}</td>
          <td><a class="btn btn-info" [routerLink]="['/dettagliFattura/', fattura.id]" routerLinkActive="active" >Modifica</a></td>
          <td><button class="btn btn-warning">Elimina</button></td>
          <td>
            <!-- <button
              class="btn btn-danger"
              (click)="eliminaCliente(cliente.id, i)"
            >
              Elimina
            </button> -->
          </td>
        </tr>
      </tbody>
    </table>
    <nav aria-label="Page navigation">
      <ul class="pagination">
        <li class="page-item" *ngIf="!response.first">
          <a class="page-link" (click)="cambiaPag(response.first)">First</a>
        </li>
        <li class="page-item" *ngIf="!response.first">
          <a class="page-link" (click)="cambiaPag(response.number - 1)"
            >Previous</a
          >
        </li>
        <li class="page-item" *ngIf="!response.last">
          <a class="page-link" (click)="cambiaPag(response.number + 1)">Next</a>
        </li>
        <li class="page-item" *ngIf="!response.last">
          <a class="page-link" (click)="cambiaPag(response.totalPages)">Last</a>
        </li>
      </ul>
    </nav>
  `,
  styles: [],
})
export class FatturePage implements OnInit {
  constructor(private fatturaSrv: FatturaService) {}
  fatture: any;
  response: any;
  pagCorr: number = 0;
  numP: any;

  ngOnInit(): void {
    this.fatturaSrv.getAll(0).subscribe((c) => {
      this.response = c;
      console.log("🚀 ~ file: fatture.page.ts ~ line 72 ~ FatturePage ~ this.fatturaSrv.getAll ~ this.response", this.response)
      this.fatture = this.response.content;
      console.log("🚀 ~ file: fatture.page.ts ~ line 73 ~ FatturePage ~ this.fatturaSrv.getAll ~ this.fatture", this.fatture)
      const numP = Array(this.response.totalPages);
      this.numP = numP;
    });
  }

  cambiaPag(page: number) {
    this.fatturaSrv.getAll(page).subscribe((c) => {
      console.log(page);
      // console.log(c);
      this.response = c;
      this.fatture = this.response.content;
      this.pagCorr = page;
      console.log(this.pagCorr);
    });
  }
}
