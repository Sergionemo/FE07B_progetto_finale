import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Cliente } from '../models/cliente';
import { ClienteService } from '../services/cliente.service';

@Component({
  template: `
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Ragione sociale</th>
          <th scope="col">Email</th>
          <th scope="col">Partita Iva</th>
          <th scope="col">
            <a
              class="btn btn-success"
              [routerLink]="['/dettagliCliente']"
              routerLinkActive="active"
              >Nuovo Cliente</a
            >
          </th>
        </tr>
      </thead>
      <tbody *ngFor="let cliente of clienti; let i = index">
        <tr>
          <th scope="row">{{ cliente.id }}</th>
          <td>{{ cliente.ragioneSociale }}</td>
          <td>{{ cliente.email }}</td>
          <td>{{ cliente.partitaIva }}</td>
          <td>
            <button
              class="btn btn-info"
              [routerLink]="['/fattureCliente', cliente.id]"
              routerLinkActive="active"
            >
              Fatture
            </button>
          </td>
          <td><button class="btn btn-warning">Modifica</button></td>
          <td>
            <button
              class="btn btn-danger"
              (click)="eliminaCliente(cliente.id, i)"
            >
              Elimina
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- <ng-template #content let-modal>
      <div class="modal-header">
        <h4 class="modal-title" id="modal-basic-title">
          Vuoi eliminare questo cliente?
        </h4>
        <button
          type="button"
          class="btn-close"
          aria-label="Close"
          (click)="modal.dismiss('Cross click')"
        ></button>
      </div>
      <div class="modal-body">
        <div class="mb-3">
          <div class="input-group">
            <p>
              Stai per eliminare definitivamente il cliente
              {{ clienti[idCliente].nomeContatto }}
              {{ clienti[idCliente].cognomeContatto }} e non potrà essere
              recuperato
            </p>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-success"
          (click)="eliminaCliente(idCliente)"
        >
          Conferma
        </button>
        <button
          type="button"
          class="btn btn-outline-dark"
          (click)="modal.close('Save click')"
        >
          Chiudi
        </button>
      </div>
    </ng-template> -->
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
  styles: [
    `
      a {
        cursor: pointer;
      }
    `,
  ],
})
export class ClientiPage implements OnInit {
  constructor(
    private clientiSrv: ClienteService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  closeResult = '';
  clienti!: Cliente[];
  numP: any;
  response: any;
  idCliente: number;
  pagCorr: number = 0;

  ngOnInit(): void {
    this.clientiSrv.getAll(0).subscribe((c) => {
      // console.log(c);
      this.response = c;
      this.clienti = this.response.content;
      // console.log(this.clienti);
      const numP = Array(this.response.totalPages);
      this.numP = numP;
    });
  }

  cambiaPag(page: number) {
    this.clientiSrv.getAll(page).subscribe((c) => {
      console.log(page);
      // console.log(c);
      this.response = c;
      this.clienti = this.response.content;
      this.pagCorr = page;
      // console.log(this.pagCorr);
    });
  }

  async eliminaCliente(idCliente: number, i: number) {
    this.idCliente = idCliente;
    // console.log(this.idCliente);
    // console.log(this.pagCorr);
    let id = this.pagCorr * 20 + this.idCliente;
    console.log(id);
    await this.clientiSrv.deleteFatture(idCliente).toPromise();
    this.clientiSrv.delete(idCliente).subscribe((c) => {
      console.log(c);
      this.router.navigate(['/clienti']);
      this.clienti.splice(i, 1);
    });
  }

  // open(content, id: number) {
  //   this.idCliente = id;
  //   console.log(this.idCliente);
  //   this.modalService
  //     .open(content, { ariaLabelledBy: 'modal-basic-title' })
  //     .result.then(
  //       (result) => {
  //         this.closeResult = `Closed with: ${result}`;
  //       },
  //       (reason) => {
  //         this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //       }
  //     );
  // }
  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return `with: ${reason}`;
  //   }
  // }
}
