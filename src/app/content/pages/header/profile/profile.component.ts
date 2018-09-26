import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
//MODELOS
import { User } from '../../../../core/models/user.model';
//SERVICIOS
import { SessionService } from '../../../../core/services/API/session.service';
import { UserService } from '../../../../core/services/API/user.service';
import { LoaderService } from '../../../../core/services/loader.service';
//CUSTOM-VALIDATION
import { CustomValidators } from 'ng2-validation';


@Component({
   selector: 'cw-profile',
   templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

   user: User;
   user_image;
   profileForm: FormGroup;
   user_subscription;

   constructor(
      public _sessionSrv: SessionService,
      public _userSrv: UserService,
      public _loaderSrv: LoaderService,
      public fb: FormBuilder
   ) {

      this.user = this._sessionSrv.userSubject.value;
      this.user_subscription = this._sessionSrv.user$.subscribe(value => this.user = value);
      this.profileForm = fb.group({
         'name': [this.user.name, [Validators.required]],
         'last_name': [this.user.last_name, [Validators.required, Validators.minLength(4)]],
         'middle_name': [this.user.middle_name, Validators.required],
         'document_no': [this.user.document_no, Validators.required],
         'email': [this.user.email, [Validators.required, CustomValidators.email]],
         'phone_no': [this.user.phone_no, Validators.required],
         'username': [this.user.username, Validators.required]
      });
   }

   ngOnInit() { }

   saveUserData() {

      this._loaderSrv.show();
      return this._userSrv.updateUser(this.profileForm.value)
         .subscribe(
            (response) => {
               console.log("response(profile.component): ", response);
               this._loaderSrv.hide();
            },
            (error) => {
               console.log("error: ", error);
               this._loaderSrv.hide();
            })

   }

   saveUserImage(){
      console.log("save user image...");
   }

   selectImage(file: File) {
      if (!file) {
         return;
      }

      console.log("select image... ", event);
   }
   ngOnDestroy() {
      this.user_subscription.unsubscribe();
   }

}
