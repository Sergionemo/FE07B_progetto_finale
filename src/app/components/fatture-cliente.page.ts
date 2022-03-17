import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
          <th scope="col">
            <a
              class="btn text-success pulsantiInt"
              [routerLink]="['/newFattura', id]"
              routerLinkActive="active"
              ><i class="bi bi-plus-circle"></i
            ></a>
          </th>
          <th scope="col">
            <button
              class="btn btn-danger px-4"
              [routerLink]="['/clienti', lastPage]"
              routerLinkActive="active"
            >
              <i class="bi bi-arrow-left"></i>
            </button>
          </th>
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
              class="btn text-info pulsantiInt"
              [routerLink]="['/dettagliFattura/', fattura.id, lastPage]"
              routerLinkActive="active"
              ><i class="bi bi-pencil-square"></i
            ></a>
          </td>
          <td>
            <button class="btn text-danger pulsantiInt" (click)="open(mymodal)">
              <i class="bi bi-trash"></i>
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
                Procedendo eliminerai la fattura numero
                <strong>{{ fattura.numero }}</strong> del cliente
                <strong>{{ fattura.cliente.ragioneSociale }}</strong>
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
                  (click)="elimina(fattura.id, i); modal.close()"
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
      <ul class="pagination mt-3" *ngIf="response.totalPages !== 1">
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
export class FattureClientePage implements OnInit {
  constructor(
    private clienteSrv: ClienteService,
    private route: ActivatedRoute,
    private fatturaSrv: FatturaService,
    private modalService: NgbModal
  ) {}

  response: any;
  fatture: Fattura[];
  numP: any;
  id!: number;
  lastPage: number;
  closeResult: any;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      this.lastPage = +params['lastPage'];
      this.clienteSrv.getFattureByCliente(this.id, 0).subscribe((c) => {
        this.response = c;
        this.fatture = this.response.content;
        const numP = Array(this.response.totalPages);
        this.numP = numP;
        // console.log(this.response.totalPages);
        // console.log('this.fatture', this.fatture);
      });
    });
  }

  cambiaPag(p: number) {
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
