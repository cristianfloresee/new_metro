//ANGULAR
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//RXJS
import { Subscription } from 'rxjs';

@Component({
   selector: 'cw-config',
   templateUrl: './config.component.html',
   styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit, OnDestroy {

   id_course;
   parameters$: Subscription;

   constructor(
      private route: ActivatedRoute,
   ) { }

   ngOnInit() {
      this.parameters$ = this.route.params.subscribe(params => {
         this.id_course = params.id;
      });
   }

   ngOnDestroy() {
      this.parameters$.unsubscribe();
   }

}
