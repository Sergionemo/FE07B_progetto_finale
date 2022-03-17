import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
              class="btn text-success pulsantiInt"
              title="aggiungi cliente"
              [routerLink]="['/dettagliCliente', pagCorr]"
              routerLinkActive="active"
              ><i class="bi bi-person-plus-fill"></i
            ></a>
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
              class="btn text-info pulsantiInt"
              title="fatture"
              [routerLink]="['/fattureCliente', cliente.id, pagCorr]"
              routerLinkActive="active"
            >
              <i class="bi bi-list-ul"></i>
            </button>
          </td>
          <td>
            <button
              class="btn text-warning pulsantiInt"
              title="modifica"
              [routerLink]="['/modificaCliente', cliente.id, pagCorr]"
              routerLinkActive="active"
            >
              <i class="bi bi-pencil-square"></i>
            </button>
          </td>
          <td>
            <button
              class="btn text-danger pulsantiInt"
              title="elimina"
              (click)="open(mymodal)"
            >
              <i class="bi bi-person-x"></i>
            </button>
            <ng-template #mymodal let-modal>
              <div class="modal-header">
                <h4 class="modal-title" id="modal-basic-title">Sei sicuro?</h4>
                <button
                  type="button"
                  class="close btn"
                  aria-label="Close"
                  (click)="modal.dismiss('Cross click')"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div class="modal-body">
                Procedendo eliminerai il cliente
                <strong>{{ cliente.ragioneSociale }}</strong> e tutte le sue
                fatture: sei sicuro?
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  (click)="modal.close('Save click')"
                >
                  Indietro
                </button>
                <button
                  type="button"
                  class="btn btn-danger"
                  (click)="eliminaCliente(cliente.id, i); modal.close()"
                >
                  Si, sono sicuro
                </button>
              </div>
            </ng-template>
          </td>
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
export class ClientiPage implements OnInit {
  constructor(
    private clientiSrv: ClienteService,
    private router: Router,
    private modalService: NgbModal,
    private route: ActivatedRoute
  ) {}

  closeResult = '';
  clienti!: Cliente[];
  numP: any;
  response: any;
  idCliente: number;
  pagCorr: number = 0;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.pagCorr = +params["lastPage"];
    })
    this.clientiSrv.getAll(this.pagCorr).subscribe((c) => {
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
      // console.log(page);
      // console.log(c);
      this.response = c;
      this.clienti = this.response.content;
      this.pagCorr = page;
      console.log(this.pagCorr);
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
    this.clientiSrv.getAll(this.pagCorr).subscribe((c) => {
      this.response = c;
      this.clienti = this.response.content;
    });
  }

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
