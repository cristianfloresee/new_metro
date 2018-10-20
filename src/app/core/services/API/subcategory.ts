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
export class SubcategoryService {

   constructor(
      public http: HttpClient
   ) { }

   createSubcategory(id_category, name) {
      return this.http.post(API.SUBCATEGORY_CREATE, { id_category, name })
   }

   getSubcategoriesByCategoryId(id_category){
      let params = `?category_options=${id_category}`
      return this.http.get(`${API.SUBCATEGORY_GET}${params}`)
   }


}
