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
//import * as _ from 'lodash';

@Injectable()
export class ModuleService {

   constructor(
      private http: HttpClient
   ) { }

   getModulesByCourseId(id_course) {
      let params = { id_course };
      return this.http.get(API.MODULE_GET, { params });
   }

   createModule(name, id_course) {
      return this.http.post(API.MODULE_CREATE, { name, id_course });
   }

   deleteModule(id_module) {
      return this.http.delete(`${API.MODULE_DELETE}${id_module}`);
   }

   updateModule(id_module, name) {
      return this.http.put(`${API.MODULE_UPDATE}${id_module}`, { name });
   }

}
