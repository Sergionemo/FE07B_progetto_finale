import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
          <td>
            <a
              class="btn text-info pulsantiInt"
              title="modifica"
              [routerLink]="['/dettagliFattura/', fattura.id, pagCorr]"
              routerLinkActive="active"
              ><i class="bi bi-pencil-square"></i
            ></a>
          </td>
          <td>
            <button
              class="btn text-warning pulsantiInt"
              title="elimina"
              (click)="open(mymodal)"
            >
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
      <ul class="pagination mt-3 ">
        <li class="page-item" *ngIf="!response.first">
          <a class="myBtn" (click)="cambiaPag(response.first)"
            ><i class="bi bi-skip-start"></i
          ></a>
        </li>
        <li class="page-item" *ngIf="!response.first">
          <a class="myBtn" (click)="cambiaPag(response.number - 1)"
            ><i class="bi bi-arrow-left"></i
          ></a>
        </li>
        <li class="page-item" *ngIf="!response.last">
          <a class="myBtn" (click)="cambiaPag(response.number + 1)"
            ><i class="bi bi-arrow-right"></i
          ></a>
        </li>
        <li class="page-item" *ngIf="!response.last">
          <a class="myBtn " (click)="cambiaPag(response.totalPages - 1)"
            ><i class="bi bi-skip-end"></i
          ></a>
        </li>
      </ul>
    </nav>
  `,
  styles: [``],
})
export class FatturePage implements OnInit {
  constructor(
    private fatturaSrv: FatturaService,
    private modalService: NgbModal,
    private route: ActivatedRoute
  ) {}
  fatture: any;
  response: any;
  pagCorr: number = 0;
  closeResult = '';
  // numP: any;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.pagCorr = +params['lastPage'];
    });
    this.fatturaSrv.getAll(this.pagCorr).subscribe((c) => {
      this.response = c;
      this.fatture = this.response.content;
      // const numP = Array(this.response.totalPages);
      // this.numP = numP;
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
