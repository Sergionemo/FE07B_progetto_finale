import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../models/cliente';
import { ClienteService } from '../services/cliente.service';
import { FatturaService } from '../services/fattura.service';


@Component({
  template: `
    <button
      [routerLink]="['/fattureCliente', id, lastPage]"
      routerLinkActive="active"
      title="indietro"
      class="btn btn-danger my-3 pulsantiInt back px-4"
    >
      <i class="bi bi-backspace"></i>
    </button>
    <form #form="ngForm" (ngSubmit)="crea(form)">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title text-center">{{ cliente.ragioneSociale }}</h5>
          <h5 class="card-subtitle mb-2 text-muted text-center">
            {{ cliente.nomeContatto }} {{ cliente.cognomeContatto }}
          </h5>
          <div class="m-2">
            <label class="card-text " for="importo">Importo: </label>
            <input
              type="number"
              id="importo"
              [(ngModel)]="form.value.importo"
              name="importo"
              class="form-control"
            />
          </div>
          <div class="m-2">
            <label class="card-text"> Stato Fattura : </label>
            <select name="stato" id="stato" ngModel class="form-select">
              <option value=""></option>
              <option value="2">PAGATA</option>
              <option value="1">NON PAGATA</option>
            </select>
          </div>

          <div class="m-2">
            <label class="card-text" for="numFatt">Numero fattura: </label>
            <input
              type="number"
              id="numFatt"
              [(ngModel)]="form.value.numFatt"
              name="numFatt"
              class="form-control"
            />
          </div>
          <div class="m-2">
            <label class="card-text">Data :</label>
            <input
              type="date"
              class="form-control"
              [(ngModel)]="form.value.data"
              name="data"
            />
          </div>
          <div class="d-flex mt-5 justify-content-evenly">
            <button type="submit" class="btn btn-success">Crea</button>
          </div>
        </div>
      </div>
    </form>
  `,
  styles: [
    `
      form {
        margin: 15vh 20vw;
      }
      .back {
        position: absolute;
        right: 1vw;
        top: 5vh;
      }
    `,
  ],
})
export class NewFatturaPage implements OnInit {
  constructor(
    private clientiSrv: ClienteService,
    private route: ActivatedRoute,
    private fattureSrv: FatturaService,
    private router: Router
  ) {}

  id: number;
  cliente: Cliente;
  response: any;
  nuovaFattura: any;
  lastPage: number;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      this.lastPage = +params['lastPage'];
      this.clientiSrv.getById(this.id).subscribe((res) => {
        this.response = res;
        console.log('this.response', this.response);
        this.cliente = this.response;
        console.log(this.cliente);
      });
    });
  }

  crea(form: any) {
    this.nuovaFattura = {
      id: 0,
      numero: 0,
      anno: 0,
      importo: 0,
      data: '',
      stato: { id: 0, nome: '' },
      cliente: {},
    };

    this.nuovaFattura.data = form.value.data;
    console.log('form.value.data', form.value.data);
    this.nuovaFattura.anno = this.nuovaFattura.data.slice(0, 4);
    this.nuovaFattura.importo = form.value.importo;
    this.nuovaFattura.numero = form.value.numFatt;
    console.log('form.value.numero', form.value.numero);
    this.nuovaFattura.stato.id = form.value.stato;
    this.nuovaFattura.cliente.id = this.cliente.id;
    this.fattureSrv.creaFattura(this.nuovaFattura).subscribe();
    this.router.navigate(['/fattureCliente', this.id, this.lastPage]);
  }
}
