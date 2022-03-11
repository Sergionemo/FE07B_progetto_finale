import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  constructor(private http: HttpClient) {}

  getAll(p: number) {
    return this.http.get(
      `${environment.pathApi}/api/clienti?page=${p}&size=20&sort=id,ASC`
    );
  }

  getById(id: number) {
    return this.http.get(
      `${environment.pathApi}/api/clienti/${id}`
    );
  }

  deleteFatture(id:number) {
    return this.http.delete(`${environment.pathApi}/api/fatture/cliente/${id}`);
  }

  delete(id:number) {
    return this.http.delete(`${environment.pathApi}/api/clienti/${id}`);
  }
}
