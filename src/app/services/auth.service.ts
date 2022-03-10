import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(item: {
    username: string;
    email: string;
    password: string;
    role: any;
  }) {
    console.log(item);
    return this.http.post(`${environment.pathApi}/api/auth/signup`, item);
  }

  login(item: any) {
    return this.http.post<any>(`${environment.pathApi}/api/auth/login`, item);
  }

  getAll() {
    return this.http.get<User[]>(`${environment.pathApi}/api/users`);
  }
}