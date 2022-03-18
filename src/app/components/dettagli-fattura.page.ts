import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Cliente } from '../models/cliente';
import { FatturaService } from '../services/fattura.service';

@Component({
  template: `

    <form #form="ngForm" (ngSubmit)="salva(form)">
      <div class="card text-center">
        <div class="card-body">
          <h3 class="card-title">{{ cliente.ragioneSociale }}</h3>
          <h5 class="card-subtitle mb-2 text-muted">
            {{ cliente.nomeContatto }} {{ cliente.cognomeContatto }}
          </h5>
          <p class="card-text">Importo: {{ fattura.importo }}€</p>
          <p class="card-text">
            Stato Fattura :
            <select name="stato" id="stato" ngModel>
              <!-- <option value="{{ fattura.stato.nome }}" selected></option> -->
              <option value=""></option>
              <option value="2" class="text-success">PAGATA</option>
              <option value="1" class="text-danger">NON PAGATA</option>
            </select>
          </p>
          <p class="card-text">ID unico: {{ fattura.id }}</p>
          <p class="card-text">Data : {{ fattura.data | date }}</p>
          <div class="d-flex mt-5 justify-content-evenly">
            <button type="submit" class="btn text-success pulsantiInt">
              <i class="bi bi-check-circle"></i>
            </button>
            <button
              [routerLink]="['/fatture', lastPage]"
              routerLinkActive="active"
              title="indietro"
              class="btn btn-secondary my-3 pulsantiInt"
            >
              <i class="bi bi-backspace"></i>
            </button>
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
                  class="btn btn-secondary "
                  (click)="modal.close('Save click')"
                >
                  Indietro
                </button>
                <button
                  type="button"
                  class="btn btn-danger"
                  (click)="elimina(fattura.id); modal.close()"
                >
                  Si, sono sicuro
                </button>
              </div>
            </ng-template>
          </div>
        </div>
      </div>
    </form>
  `,
  styles: [
    `
      form {
        margin: 20vh 20vw;
      }
      p {
        font-size: 1.3rem;
      }
      .pulsantiInt {
        font-size: 1.7rem;
      }
      select {
        background-color: black;
        color: white;
      }
      option {
        color: white;
      }
    `,
  ],
})
export class DettagliFatturaPage implements OnInit {
  fattura: any;
  response: any;
  cliente: Cliente;
  closeResult = '';
  lastPage: number
  idFatt: number
  idCliente: number

  constructor(
    private fatturaSrv: FatturaService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.idFatt = +params['id'];
      this.lastPage = +params["lastPage"];

      this.caricaDettagli(this.idFatt);
    });
  }

  caricaDettagli(id: number) {
    this.fatturaSrv.dettagli(id).subscribe((res) => {
      this.fattura = res;
      this.cliente = this.fattura.cliente;
    });
  }

  salva(form: NgForm) {
    this.fattura.stato.id = form.value.stato;
    this.fatturaSrv.modifica(this.fattura).subscribe((res) => {
      console.log(res);
      this.router.navigate(['/fatture/0']);
    });
  }

  elimina(id: number) {
    this.fatturaSrv.delete(id).subscribe(() => {
      this.router.navigate(['/fatture/0']);
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
