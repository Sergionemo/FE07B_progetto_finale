import { Component, OnInit } from '@angular/core';
import { DettagliClienteService } from '../services/dettagli-cliente.service';

@Component({
  template: `
    <form #form="ngForm" class="container mt-5">
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
        <input
          type="text"
          id="comuneSedeOperativa"
          class="form-control"
          [(ngModel)]="form.value.comuneSedeOperativa"
          name="comuneSedeOperativa"
        />
      </div>
      <div class="mb-3">
        <label for="provinciaSedeOperativa">Provincia *</label>
        <input
          type="text"
          id="provinciaSedeOperativa"
          class="form-control"
          [(ngModel)]="form.value.provinciaSedeOperativa"
          name="provinciaSedeOperativa"
        />
      </div>
    </form>
  `,
  styles: [],
})
export class DettagliClientePage implements OnInit {
  constructor(private dettClienteSrv: DettagliClienteService) {}

  tipiClienti: any;

  ngOnInit(): void {
    this.dettClienteSrv.getTipiCliente().subscribe((c) => {
      this.tipiClienti = c;
    });
  }
}
