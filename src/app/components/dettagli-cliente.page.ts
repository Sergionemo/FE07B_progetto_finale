import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Comune } from '../models/comune';
import { Provincia } from '../models/provincia';
import { ComuniProvinceService } from '../services/comuni-province.service';
import { DettagliClienteService } from '../services/dettagli-cliente.service';

@Component({
  template: `
    <form #form="ngForm" class="container mt-5 mb-5" (ngSubmit)="inviaDati(form)">
      <h2>Informazioni personali cliente</h2>
      <div class="mb-3">
        <label for="ragioneSociale">Ragione sociale *</label>
        <input
          type="text"
          id="ragioneSociale"
          class="form-control"
          [(ngModel)]="form.value.ragioneSociale"
          name="ragioneSociale"
        />
      </div>
      <div class="mb-3">
        <label for="partitaIVA">Partita IVA *</label>
        <input
          type="text"
          id="partitaIVA"
          class="form-control"
          [(ngModel)]="form.value.partitaIVA"
          name="partitaIVA"
        />
      </div>
      <div class="mb-3">
        <label for="tipoCliente">Scegli tipo cliente:</label>
        <select
          class="form-select"
          aria-label="Default select example"
          id="tipoCliente"
          [(ngModel)]="form.value.tipoCliente"
          name="tipoCliente"
        >
          <option
            *ngFor="let tipoC of tipiClienti; let i = index"
            value="{{ tipoC }}"
          >
            {{ tipoC }}
          </option>
        </select>
      </div>
      <div class="mb-3">
        <label for="email">Email *</label>
        <input
          type="text"
          id="email"
          class="form-control"
          [(ngModel)]="form.value.email"
          name="email"
        />
      </div>
      <div class="mb-3">
        <label for="pec">Pec *</label>
        <input
          type="text"
          id="pec"
          class="form-control"
          [(ngModel)]="form.value.pec"
          name="pec"
        />
      </div>
      <div class="mb-3">
        <label for="telefono">Telefono *</label>
        <input
          type="text"
          id="telefono"
          class="form-control"
          [(ngModel)]="form.value.telefono"
          name="telefono"
        />
      </div>
      <div class="mb-3">
        <label for="nomeContatto">Nome Contatto *</label>
        <input
          type="text"
          id="nomeContatto"
          class="form-control"
          [(ngModel)]="form.value.nomeContatto"
          name="nomeContatto"
        />
      </div>
      <div class="mb-3">
        <label for="cognomeContatto">Cognome Contatto *</label>
        <input
          type="text"
          id="cognomeContatto"
          class="form-control"
          [(ngModel)]="form.value.cognomeContatto"
          name="cognomeContatto"
        />
      </div>
      <div class="mb-3">
        <label for="telefonoContatto">Telefono Contatto *</label>
        <input
          type="text"
          id="telefonoContatto"
          class="form-control"
          [(ngModel)]="form.value.telefonoContatto"
          name="telefonoContatto"
        />
      </div>
      <h2>Sede Operativa</h2>
      <div class="mb-3">
        <label for="viaSedeOperativa">Via *</label>
        <input
          type="text"
          id="viaSedeOperativa"
          class="form-control"
          [(ngModel)]="form.value.viaSedeOperativa"
          name="viaSedeOperativa"
        />
      </div>
      <div class="mb-3">
        <label for="civicoSedeOperativa">Civico *</label>
        <input
          type="text"
          id="civicoSedeOperativa"
          class="form-control"
          [(ngModel)]="form.value.civicoSedeOperativa"
          name="civicoSedeOperativa"
        />
      </div>
      <div class="mb-3">
        <label for="capSedeOperativa">CAP *</label>
        <input
          type="text"
          id="capSedeOperativa"
          class="form-control"
          [(ngModel)]="form.value.capSedeOperativa"
          name="capSedeOperativa"
        />
      </div>
      <div class="mb-3">
        <label for="localitaSedeOperativa">Località *</label>
        <input
          type="text"
          id="localitaSedeOperativa"
          class="form-control"
          [(ngModel)]="form.value.localitaSedeOperativa"
          name="localitaSedeOperativa"
        />
      </div>
      <div class="mb-3">
        <label for="comuneSedeOperativa">Comune *</label>
        <select
          class="form-select"
          aria-label="Default select example"
          id="comuneSedeOperativa"
          [(ngModel)]="form.value.comuneSedeOperativa"
          name="comuneSedeOperativa"
          (change)="cambioCitta1($event)"
        >
          <option
            *ngFor="let comune of comuni; let i = index"
            value="{{ comune.id }}"
          >
            {{ comune.nome }}
          </option>
        </select>
      </div>
      <div class="mb-3">
        <label for="provinciaSedeOperativa">Provincia *</label>
        <input
          type="text"
          readonly
          name="provinciaSedeOperativa"
          id="provinciaSedeOperativa"
          class="form-control"
          [(ngModel)]="provincia1"
        />
        <!-- <select
          class="form-select"
          aria-label="Default select example"
          id="provinciaSedeLegale"
          [(ngModel)]="form.value.provinciaSedeLegale"
          name="provinciaSedeLegale"
        >
          <option
            *ngFor="let comune of com; let i = index"
            value="{{ comune.provincia.nome }}"
          >
            {{ comune.provincia.nome }}
          </option>
        </select> -->
      </div>
      <h2>Sede Legale</h2>
      <div class="mb-3">
        <label for="viaSedeLegale">Via *</label>
        <input
          type="text"
          id="viaSedeLegale"
          class="form-control"
          [(ngModel)]="form.value.viaSedeLegale"
          name="viaSedeLegale"
        />
      </div>
      <div class="mb-3">
        <label for="civicoSedeLegale">Civico *</label>
        <input
          type="text"
          id="civicoSedeLegale"
          class="form-control"
          [(ngModel)]="form.value.civicoSedeLegale"
          name="civicoSedeLegale"
        />
      </div>
      <div class="mb-3">
        <label for="capSedeLegale">CAP *</label>
        <input
          type="text"
          id="capSedeLegale"
          class="form-control"
          [(ngModel)]="form.value.capSedeLegale"
          name="capSedeLegale"
        />
      </div>
      <div class="mb-3">
        <label for="localitaSedeLegale">Località *</label>
        <input
          type="text"
          id="localitaSedeLegale"
          class="form-control"
          [(ngModel)]="form.value.localitaSedeLegale"
          name="localitaSedeLegale"
        />
      </div>
      <div class="mb-3">
        <label for="comuneSedeLegale">Comune *</label>
        <select
          class="form-select"
          aria-label="Default select example"
          id="comuneSedeLegale"
          [(ngModel)]="form.value.comuneSedeLegale"
          name="comuneSedeLegale"
          (change)="cambioCitta2($event)"
        >
          <option
            *ngFor="let comune of comuni; let i = index"
            value="{{ comune.id }}"
          >
            {{ comune.nome }}
          </option>
        </select>
      </div>
      <div class="mb-3">
        <label for="provinciaSedeLegale">Provincia *</label>
        <input
          type="text"
          readonly
          name="provinciaSedeLegale"
          id="provinciaSedeLegale"
          class="form-control"
          [(ngModel)]="provincia2"
        />
        <!-- <select
          class="form-select"
          aria-label="Default select example"
          id="provinciaSedeLegale"
          [(ngModel)]="form.value.provinciaSedeLegale"
          name="provinciaSedeLegale"
        >
          <option
            *ngFor="let comune of com; let i = index"
            value="{{ comune.provincia.nome }}"
          >
            {{ comune.provincia.nome }}
          </option>
        </select> -->
      </div>
      <div>
        <button type="submit" class="btn btn-success">Crea cliente</button>
      </div>
    </form>
  `,
  styles: [],
})
export class DettagliClientePage implements OnInit {
  constructor(
    private dettClienteSrv: DettagliClienteService,
    private comProvSrv: ComuniProvinceService,
    private router: Router
  ) {}

  tipiClienti: any;
  comuni: Comune[];
  province: Provincia;
  response: any;
  idCitta: any;
  com: any;
  provincia1: string;
  provincia2: string;

  ngOnInit(): void {
    this.dettClienteSrv.getTipiCliente().subscribe((c) => {
      this.tipiClienti = c;
    });
    this.comProvSrv.getAllProvince(0).subscribe((c) => {
      console.log(c);
      this.response = c;
      this.province = this.response.content;
    });
    this.comProvSrv.getAllComuni(0).subscribe((c) => {
      console.log('c', c);
      this.response = c;
      this.comuni = this.response.content;
      this.com = this.comuni;
      console.log('this.com', this.com);
    });
  }

  cambioCitta1(event: any) {
    this.idCitta = event.target.value;
    this.comProvSrv.getComuneId(this.idCitta).subscribe((c) => {
      this.response = c;
      console.log('this.response', this.response.provincia.nome);
      this.provincia1 = this.response.provincia.nome;
    });
  }

  cambioCitta2(event: any) {
    this.idCitta = event.target.value;
    this.comProvSrv.getComuneId(this.idCitta).subscribe((c) => {
      this.response = c;
      console.log('this.response', this.response.provincia.nome);
      this.provincia2 = this.response.provincia.nome;
    });
  }

  inviaDati(form: NgForm) {
    this.dettClienteSrv.creaNuovoCliente(form).subscribe(()=> {
      this.router.navigate(["/clienti"])
    })
  }
}
