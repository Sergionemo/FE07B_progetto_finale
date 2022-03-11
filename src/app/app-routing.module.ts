import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientiPage } from './components/clienti.page';
import { DettagliClientePage } from './components/dettagli-cliente.page';
import { DettagliFatturaPage } from './components/dettagli-fattura.page';
import { FatturePage } from './components/fatture.page';
import { HomePage } from './components/home.page';
import { LoginPage } from './components/login.page';
import { SignupPage } from './components/signup.page';
import { UtentiPage } from './components/utenti.page';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'signup',
    component: SignupPage,
  },
  {
    path: 'clienti',
    component: ClientiPage,
  },
  {
    path: 'utenti',
    component: UtentiPage,
  },
  {
    path: 'fatture',
    component: FatturePage,
  },
  {
    path: 'dettagliCliente',
    component: DettagliClientePage,
  },
  {
    path: 'dettagliFattura/:id',
    component: DettagliFatturaPage,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
