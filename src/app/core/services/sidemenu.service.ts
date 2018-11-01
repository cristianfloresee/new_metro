//ANGULAR
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
//OBJECT-PATH
import * as objectPath from 'object-path';
//RXJS
import { BehaviorSubject, Observable, throwError } from 'rxjs';

//CONSTANTES
import { MENU, MENU_ADMIN } from 'src/app/config/menu';
import { CourseService } from './API/course.service';
import { SessionService } from './API/session.service';
import { map, catchError } from 'rxjs/operators';
import { utilService } from './utils.service';


@Injectable()
export class SidemenuService {

   sidemenuSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
   sidemenu$: Observable<any> = this.sidemenuSubject.asObservable();

   constructor(
      private _courseSrv: CourseService,
      private _sessionSrv: SessionService,
      private _utilSrv: utilService
   ){}


   changeSidemenuByRole(role: number){
      if(role == 1) this.sidemenuSubject.next(MENU_ADMIN)
      else if(role == 2){
         this._courseSrv.getCoursesForSidemenu(this._sessionSrv.userSubject.value.id_user)
         .subscribe(result=> {
            let menu_formatted = this._utilSrv.formatMenu(result);
            console.log("kikasilva: ", menu_formatted);
            this.sidemenuSubject.next(menu_formatted);
         })
      }
      else this.sidemenuSubject.next(MENU);
   }

   // changeSidemenu(menu) {
   //    this.sidemenuSubject.next(menu);
   // }

   cleanSidemenu(){
      this.sidemenuSubject.next(null);
   }
}
