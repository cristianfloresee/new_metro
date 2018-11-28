// Angular
import { Component, OnInit, Input } from '@angular/core';
// ng-bootstrap
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// Modals
import { CreateModuleComponent } from '../../../modals/create-module/create-module.component';
// Services
import { ModuleService } from 'src/app/core/services/API/module.service';
//import { SessionService } from 'src/app/core/services/API/session.service';
// SweetAlert
import Swal from 'sweetalert2';
import { EditModuleComponent } from '../../../modals/edit-module/edit-module.component';
// RxJS
import { Subscription } from 'rxjs';

@Component({
   selector: 'cw-modules',
   templateUrl: './modules.component.html',
   styleUrls: ['./modules.component.scss']
})
export class ModulesComponent implements OnInit {
   @Input() id_course;

   //id_user;
   modules;

   constructor(
      private _moduleSrv: ModuleService,
      //private _sessionSrv: SessionService,
      private ngModal: NgbModal
   ) { }

   ngOnInit() {
      this.getModules();
   }


   createModule() {
      //ENVIAR EL ID_COURSE
      const modalRef = this.ngModal.open(CreateModuleComponent);
      modalRef.componentInstance.id_course = this.id_course;

      modalRef.result.then((result) => {
         console.log(`result: ${result}, ${typeof(result)}`)
         if (result) this.getModules()
      });
   }

   getModules() {
      this._moduleSrv.getModulesByCourseId(this.id_course)
         .subscribe((value: any) => {
            console.log("modulos: ", value);
            this.modules = value;
         })
   }

   updateModule(module){
      console.log("update: ", module);
      const modalRef = this.ngModal.open(EditModuleComponent);
      modalRef.componentInstance.module = module;

      modalRef.result.then((result) => {
         if (result) this.getModules()
      });
   }


   deleteModule(id_module) {
      console.log("id_module: ", id_module);
      const swalWithBootstrapButtons = Swal.mixin({
         confirmButtonClass: 'btn btn-success',
         cancelButtonClass: 'btn btn-danger',
         buttonsStyling: false,
      })

      swalWithBootstrapButtons({
         title: '¿Está seguro?',
         text: "¿Seguro desea eliminar el modulo?",
         type: 'warning',
         showCancelButton: true,
         confirmButtonText: 'Si, Eliminar',
         cancelButtonText: 'Cancelar',
         reverseButtons: true
      }).then((result) => {

         if (result.value) {
            this._moduleSrv.deleteModule(id_module)
               .subscribe(
                  result => {
                     console.log("result: ", result);

                     swalWithBootstrapButtons(
                        'Acción realizada!',
                        'El modulo ha sido eliminado',
                        'success'
                     )
                     this.getModules();
                  },
                  error => {
                     console.log("error:", error);
                  });
         }
      })
   }


}
