// ANGULAR
import { Component, OnInit } from '@angular/core';
import { LoaderService } from './core/services/loader.service';

@Component({
   selector: 'cw-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
   title = 'client';

   show_loader: boolean;

   constructor(private loaderSrv: LoaderService){

   }

   ngOnInit(){
      this.loaderSrv.status.subscribe((status: boolean)=>{
         this.show_loader = status;
      })
   }
}
