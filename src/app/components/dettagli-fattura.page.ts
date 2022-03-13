import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../models/cliente';
import { FatturaService } from '../services/fattura.service';

@Component({
  template: `
    <form #form="ngForm" (ngSubmit)="salva(form)">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">{{ cliente.ragioneSociale }}</h5>
          <h5 class="card-subtitle mb-2 text-muted">
            {{ cliente.nomeContatto }} {{ cliente.cognomeContatto }}
          </h5>
          <p class="card-text">Importo: {{ fattura.importo }}€</p>

          <p class="card-text">
            Stato Fattura :
            <select name="stato" id="stato" ngModel>
              <option value="{{ fattura.stato.nome }}" selected></option>
              <option value="PAGATA">PAGATA</option>
              <option value="NON PAGATA">NON PAGATA</option>
            </select>
          </p>
          <p class="card-text">ID unico: {{ fattura.id }}</p>
          <p class="card-text">Data : {{ fattura.data | date }}</p>
          <div class="d-flex mt-5 justify-content-evenly">
            <button type="submit" class="btn btn-success">Salva</button>
            <button class="btn btn-danger" (click)="elimina(fattura.id)">
              Elimina
            </button>
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
    `,
  ],
})
export class DettagliFatturaPage implements OnInit {
  fattura: any;
  response: any;
  cliente: Cliente;

  constructor(
    private fatturaSrv: FatturaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = +params['id'];
      this.caricaDettagli(id);
    });
  }

  caricaDettagli(id: number) {
    this.fatturaSrv.dettagli(id).subscribe((res) => {
      console.log(
        '🚀 ~ file: dettagli-fattura.page.ts ~ line 69 ~ DettagliFatturaPage ~ this.fatturaSrv.dettagli ~ res',
        res
      );
      this.fattura = res;
      // console.log(
      //   '🚀 ~ file: dettagli-fattura.page.ts ~ line 67 ~ DettagliFatturaPage ~ this.fatturaSrv.dettagli ~ this.response',
      //   this.fattura.cliente
      // );
      this.cliente = this.fattura.cliente;
    });
  }

  salva(form: NgForm) {
    debugger;
    console.log(form.value.stato);
    this.fattura.stato.nome = form.value.stato;
    console.log(this.fattura);
    this.fatturaSrv.modifica(this.fattura).subscribe((res) => {
      this.router.navigate(['/fatture']);
    });
  }

  elimina(id: number) {
    this.fatturaSrv.delete(id).subscribe(()=> {
      this.router.navigate(['/fatture']);
    })
  }
}
