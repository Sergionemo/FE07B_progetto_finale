import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FatturaService {

  constructor(private http: HttpClient) { }

  getAll(p: number) {
    return this.http.get(
      `${environment.pathApi}//api/fatture?page=${p}&size=20&sort=id,ASC`
    );
  }
}
