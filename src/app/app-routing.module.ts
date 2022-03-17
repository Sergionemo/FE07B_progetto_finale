import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientiPage } from './components/clienti.page';
import { DettagliClientePage } from './components/dettagli-cliente.page';
import { DettagliFatturaPage } from './components/dettagli-fattura.page';
import { FattureClientePage } from './components/fatture-cliente.page';
import { FatturePage } from './components/fatture.page';
import { HomePage } from './components/home.page';
import { LoginPage } from './components/login.page';
import { ModificaClientePage } from './components/modifica-cliente.page';
import { NewFatturaPage } from './components/new-fattura.page';
import { SignupPage } from './components/signup.page';
import { UtentiPage } from './components/utenti.page';
import { AuthGuard } from './guard/auth.guard';

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
    path: 'clienti/:lastPage',
    component: ClientiPage,
    canActivate: [AuthGuard],
  },
  {
    path: 'utenti',
    component: UtentiPage,
    canActivate: [AuthGuard],
  },
  {
    path: 'fatture/:lastPage',
    component: FatturePage,
    canActivate: [AuthGuard],
  },
  {
    path: 'dettagliCliente/:lastPage',
    component: DettagliClientePage,
    canActivate: [AuthGuard],
  },
  {
    path: 'dettagliFattura/:id/:lastPage',
    component: DettagliFatturaPage,
    canActivate: [AuthGuard],
  },
  {
    path: 'fattureCliente/:id/:lastPage',
    component: FattureClientePage,
    canActivate: [AuthGuard],
  },
  {
    path: 'newFattura/:id/:lastPage',
    component: NewFatturaPage,
    canActivate: [AuthGuard],
  },
  {
    path: 'modificaCliente/:id/:lastPage',
    component: ModificaClientePage,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
