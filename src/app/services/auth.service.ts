import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private fireAuth: AngularFireAuth,
    private router: Router,
    private afDb: AngularFireDatabase
  ) { }


  // login
  login(email: string, password: string){
    this.fireAuth.signInWithEmailAndPassword(email,password).then(()=>{
      this.router.navigateByUrl('/users')
    }, err => {
      alert(err.message)

    })
  }

  // register
  register(email: string, password: string, names: string){
    this.fireAuth.createUserWithEmailAndPassword(email, password).then(()=>{
      alert('Registration Successful');
      this.router.navigateByUrl('/users')
      this.storeUser(email, password, names)
    }, err =>{
      alert(err.message)
    })
  }

  // store user
  storeUser(email: string, password: string, names: string){
    const body = {
      name: names,
      email: email,
      role: 'user'
    }
    const itemsRef = this.afDb.database.ref(`users`);
    itemsRef.push(body).then((res: any)=>{

    }, (err) =>{
      alert(err.message)
    })
  }
}
