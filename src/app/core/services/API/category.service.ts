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
   ) {}

   getCategories(from?, limit?, search?){
      let params = '';

      if (from != undefined && limit) {
         params = `?from=${from}&limit=${limit}`;
         if (search) params += `&search=${search}`;
      }

      return this.http.get(`${API.CATEGORY_GET}${params}`)
   }

   getCategoriesByUserId(id_user){
      let params = `?teacher_options=${id_user}`
      return this.http.get(`${API.CATEGORY_GET}${params}`)
   }

   getCategoriesByUserIdAndSubjectId(id_user,id_subject){
      let params = `?id_user=${id_user}&id_subject=${id_subject}`;
      return this.http.get(`${API.CATEGORY_GET}${params}`);
   }

   createCategory(id_user, id_subject, name){
      return this.http.post(API.CATEGORY_CREATE, {id_user, id_subject, name})
   }

   getLastCategoriesByTeacherId(id_user){
      let params = `?last_by_teacher=${id_user}`;
      return this.http.get(`${API.CATEGORY_GET}${params}`)
   }

}
