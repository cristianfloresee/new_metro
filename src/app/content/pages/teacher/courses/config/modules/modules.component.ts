import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cw-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss']
})
export class ModulesComponent implements OnInit {
   @Input() id_number;

  constructor(
     //private moduleSrv: ModuleService
  ) { }

  ngOnInit() {
     console.log("id number: ", this.id_number);

  }

}
