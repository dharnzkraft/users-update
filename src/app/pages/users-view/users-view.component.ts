import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';
import { map } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users-view.component.scss']
})
export class UsersViewComponent {
  users: any;
  userEmail: any ;
  nextUserIndex: number = 0;
  
  constructor(
    private userService: UsersService,
    private afAuth: AngularFireAuth,
    private afDb: AngularFireDatabase,
    private router: Router
  ){

    this.afAuth.onAuthStateChanged(user => {
      if (user) {
        this.userEmail = user.email;
       console.log(this.userEmail)
        if(this.userEmail){
          this.serializeUser()
        }
      } else {
        // User is not authenticated
      }
    });

  }

  serializeUser(){


    this.userService.fetchUsers().snapshotChanges().pipe(
      map(changes =>
        changes.map(
          c => 
          ({key: c.payload.key, data: c.payload.val()})
        )
        )
    ).subscribe((res: any)=>{
      this.users = res;
      const userIndex = this.users.findIndex((item: { data: { email: any; }; }) => item.data.email === this.userEmail  )
      console.log(userIndex)
      this.nextUserIndex = userIndex + 1
    })
  }

  approveUser(key: string){
    const body = {
      "role": "admin"
    }
    const selected = this.users.findIndex((item: { name: any })=> item.name === name );

    this.afDb.list(`/users`).update(key, body).then((res: any)=>{
      if(res){
        alert('user has been approved')
      }
    }, (error)=>{
      alert(error.message)
    })
  }

  signOut(){
    this.afAuth.signOut().then((res: any)=>{
      this.router.navigateByUrl('/')
    })
  }
  
}
