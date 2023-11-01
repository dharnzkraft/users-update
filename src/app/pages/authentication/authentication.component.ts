import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import * as AOS from 'aos';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent {
  nextStep: number = 1;
  email: string = '';
  password: string  = '';
  names: string = ''

  constructor(
    private auth: AuthService
  ){
    
  }

  
 

  login(){
    if(this.email == ''){
      alert('Please enter Email');
      return;
    }

    if(this.password == ''){
      alert('Please enter Password');
      return;
    }

    this.auth.login(this.email, this.password);
    this.email = '';
    this.password = '';
  }

  register(){
    if(this.email == ''){
      alert('please enter email');
      return;
    }

    if(this.password == ''){
      alert('please enter password');
      return;
    }

    if(this.names == ''){
      alert('please enter your names');
      return;
    }

    this.auth.register(this.email, this.password, this.names)
  }
}
