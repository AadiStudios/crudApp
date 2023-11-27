import { Component,inject,ViewChild } from '@angular/core';
import { Firestore, getFirestore } from '@angular/fire/firestore';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ActivatedRoute,Router } from '@angular/router';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent {
  @ViewChild ('loginPage') gateform : any;
  firestore : Firestore = inject (Firestore);
  constructor(private router:Router){

  };
  async loginForm(){
    const auth = getAuth();
    signInWithEmailAndPassword(auth,this.gateform.value.email,this.gateform.value.password).then((userCredential)=>{
      const user = userCredential.user;
      console.log("login Successful");
      this.router.navigate(['/index']);
    }).catch((error)=>{
      console.log(error);
    });

  }
  
}
