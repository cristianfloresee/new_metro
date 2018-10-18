//ANGULAR
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//CONSTANTES
import { API } from '../../../config/constants';
//SERVICIOS
import { SessionService } from './session.service';
//RXJS
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable()
export class CategoryService {

   constructor(
      public http: HttpClient
   ) { }

   //OBTENER CATEGORÍAS POR PROFESOR
   //CATEGORIAS POR ASINATURA

   getCategories(from?, limit?, search?) {
      let params = '';
      if (from != undefined && limit) {
         params = `?from=${from}&limit=${limit}`;
         if (search) params += `&search=${search}`;
      }
      return this.http.get(`${API.CATEGORY_GET}${params}`)
         .pipe(map((response: any) => response))

   }

   createCategory(category) {
      const { id_user, id_subject, name } = category;
      return this.http.post(API.CATEGORY_CREATE, { id_user, id_subject, name });
   }

   updateCategory(category, id_category) {
      const { id_subject, name } = category;
      return this.http.put(`${API.CATEGORY_UPDATE}${id_category}`, { id_subject, name })
         .pipe(
            map((response: any) => {
               console.log("RESPONSE: ", response);
               return true;
            }),
            catchError(err => {
               console.log("error en el service: ", err)
               return throwError(err);
            })
         );
   }

   deleteCalendar(id_category) {
      return this.http.delete(`${API.CATEGORY_DELETE}${id_category}`);
   }

   countCategory() {
      return this.http.get(`${API.CATEGORY_COUNT}`);
   }

}
