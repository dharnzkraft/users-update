import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private afDb: AngularFireDatabase
  ) { }

  fetchUsers(){
    const itemsRef = this.afDb.list(`/users`);
    return itemsRef;
  }
}
