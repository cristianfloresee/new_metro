

import { Role } from './role.model';

export class User {

   constructor(
      public name: string,
      public last_name: string,
      public middle_name: string,
      public document_no: string,
      public email: string,
      public phone_no: string,
      public username: string,
      public roles?: Array<Role>,
      public id_user?: number,
      public active?: boolean,
      public profile_image?: string,
      public created_at?: Date,
      public updated_at?: Date,
      public password?: string
   ) { }

}
