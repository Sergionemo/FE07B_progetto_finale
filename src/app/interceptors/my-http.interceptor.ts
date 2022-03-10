import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let authReq: HttpRequest<any> = req.clone({
      headers: req.headers.set(
          'Authorization',
          'Bearer ' +
            'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY0NjkwNDYwOSwiZXhwIjoxNjQ3NzY4NjA5fQ.sA-95t2IpeekNS_8Cg45QgL3UCBBJ8s6QqbdEJ9cddejfRIcu3FIJTxWTq_L30IorlIAPJf-EM9OjX3EQ7j4Jg'
        )
        .set('X-TENANT-ID', 'fe_0721b'),
    });
    return next.handle(authReq);
  }
}
