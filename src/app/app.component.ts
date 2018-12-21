//ANGULAR
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { NavigationEnd, Router } from '@angular/router';

//RXJS
import { filter } from 'rxjs/operators';

// Services
import { LoaderService } from './core/services/loader.service';
import { PageService } from './core/services/page.service';
import { RoleService } from './core/services/role.service';
import { SessionService } from './core/services/API/session.service';
import { SocketService } from './core/services/socket.service';



@Component({
   selector: 'cw-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss'],
   animations: [
      trigger('loader_container', [
         state('false', style({ opacity: '0' })),
         state('true', style({ opacity: '0.2' })),
         transition('false => true', animate('300ms ease-in')),
         transition('true => false', animate('600ms ease-in')),
      ]),
      trigger('loader_content', [
         state('false', style({ opacity: '0' })),
         state('true', style({ opacity: '1' })),
         transition('false => true', animate('500ms ease-in')),
         transition('true => false', animate('500ms ease-in')),
      ])
   ]
})
export class AppComponent implements OnInit {
   @ViewChild('cwLoader') cwLoader: ElementRef;

   show_loader: boolean;
   ioConnection: any;

   constructor(
      private loaderSrv: LoaderService,
      private _pageSrv: PageService,
      private router: Router,
      private _roleSrv: RoleService,
      private _sessionSrv: SessionService,
      private _socketService: SocketService
   ) {

      //OBTIENE EL NOMBRE DE LA PÁGINA ACTUAL
      this.router.events
         .pipe(filter(event => event instanceof NavigationEnd))
         .subscribe((event) => {
            let url = event['urlAfterRedirects']
            //let url = event['urlAfterRedirects'];
            this._roleSrv.checkUrlRole(url);

            console.log("nombre de la página: ", this._pageSrv.getCurrentPageConfig());
            //this.layoutConfigService.setModel({ page: objectPath.get(this.pageConfigService.getCurrentPageConfig(), 'config') }, true);
         });

   }



   ngOnInit() {
      this.loaderSrv.status.subscribe((status: boolean) => {
         this.show_loader = status;
         if (status) this.cwLoader.nativeElement.style.display = 'block';
         else setTimeout(() => this.cwLoader.nativeElement.style.display = 'none', 600)
      })
      this.checkIsAuth();
   }


   //CHEQUEA SI EL USUARIO TIENE UNA SESIÓN INICIADA e inicia el Web Socket en caso de ser así
   checkIsAuth() {
      // Comprueba si esta logueado
      if (this._sessionSrv.isLogged()) {

         //this._socketService.initSocket();
      }
   }



}
