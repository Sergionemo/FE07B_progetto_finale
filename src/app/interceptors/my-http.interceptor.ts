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
      headers: req.headers
        .set(
          'Authorization',
          'Bearer ' +
            'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY0Nzk2NjI4NSwiZXhwIjoxNjQ4ODMwMjg1fQ.TbfZqvmWhI2juS3it0ncw3Wx-mV3YSb_EOAfexRxb56By0LdojpcQhd9WxbBtI4S9kY9dzppPpAtUsS_0InO5Q'
        )
        .set('X-TENANT-ID', 'fe_0721b'),
    });
    return next.handle(authReq);
  }
}
