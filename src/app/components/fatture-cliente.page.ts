import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Fattura } from '../models/fattura';
import { ClienteService } from '../services/cliente.service';
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
          <th scope="col"><a class="btn btn-success" [routerLink]="['/newFattura' ,id]" routerLinkActive="active" >Nuova Fattura</a></th>
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
          <td>
            <a
              class="btn btn-info"
              [routerLink]="['/dettagliFattura/', fattura.id]"
              routerLinkActive="active"
              >Modifica</a
            >
          </td>
          <td>
            <button class="btn btn-warning" (click)="elimina(fattura.id, i)">
              Elimina
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <nav aria-label="Page navigation">
      <ul class="pagination">
        <li class="page-item" *ngIf="!response.first">
          <a class="page-link" (click)="cambiaPag(response.number - 1)"
            >Previous</a
          >
        </li>
        <li class="page-item" *ngFor="let pag of numP; let p = index">
          <a class="page-link" (click)="cambiaPag(p)">{{ p + 1 }}</a>
        </li>
        <li class="page-item" *ngIf="!response.last">
          <a class="page-link" (click)="cambiaPag(response.number + 1)">Next</a>
        </li>
      </ul>
    </nav>
  `,
  styles: [],
})
export class FattureClientePage implements OnInit {
  constructor(
    private clienteSrv: ClienteService,
    private route: ActivatedRoute,
    private fatturaSrv: FatturaService
  ) {}

  response: any;
  fatture: Fattura[];
  numP: any;
  id!: number;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      console.log(this.id);
      this.caricaDettagli(this.id);

    });
  }

  caricaDettagli(id: number) {
    this.clienteSrv.getFattureByCliente(id, 0).subscribe((c) => {
      this.response = c;
      this.fatture = this.response.content;
      const numP = Array(this.response.totalPages);
      this.numP = numP;
      // console.log(this.numP);
      console.log('this.fatture', this.fatture);
    });
  }

  cambiaPag(p:number) {
    this.clienteSrv.getFattureByCliente(this.id, p).subscribe((c) => {
      this.response = c;
      this.fatture = this.response.content;
      // console.log(this.pagCorr);
    });
  }

  elimina(id: number, i: number) {
    this.fatturaSrv.delete(id).subscribe(() => {
      this.fatture.splice(i, 1);
    });
  }
}
