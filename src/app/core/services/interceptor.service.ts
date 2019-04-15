//https://github.com/angular/angular/issues/20203
// Angular
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http'
import { Router } from '@angular/router';
// RxJS
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable()
export class InterceptorService implements HttpInterceptor {

   constructor(public router: Router) { }

   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      // if (SKIP_INTERCEPTOR.some(x => x === req.url)) {
      //    return next.handle(req);
      // }

      req = req.clone({ setHeaders: { authorization: localStorage.getItem('token') } });

      return next.handle(req).pipe(
         tap(event => { }),
         catchError((err) => {
            if (err instanceof HttpErrorResponse) {

               //SI EL TOKEN CADUCO:
               if (err.status === 401) {
                  this.router.navigate(['/login']);
               }
               // if (err.status == 0) throw ({ error: "Revise su conexión a intenet" })
               // else if (err.status == 404) {
               //     //console.log("El servidor no encuentra la ruta..");
               //     throw ({ error: "Problema de comunicación con nuestros servidores" })
               // }

            }

            return throwError(err);
         })
      );
   }

}
