import { Component, OnInit } from '@angular/core';
import { SubheaderService } from '../../../core/services/layout/subheader.service';

@Component({
  selector: 'cw-subheader',
  templateUrl: './subheader.component.html'
})
export class SubheaderComponent implements OnInit {

  constructor(
     private _subheaderSrv: SubheaderService
  ) { }

  ngOnInit() {

  }

}
