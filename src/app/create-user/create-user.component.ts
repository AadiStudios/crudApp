import { Component,ViewChild,inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { addDoc,collection }from 'firebase/firestore';
import { NgForm } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { getAuth, createUserWithEmailAndPassword,signOut } from "firebase/auth";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})

export class CreateUserComponent {
  @ViewChild("createUserForm") userform:any;
 firestore:Firestore = inject (Firestore)
 constructor(private router:Router){

 };
 
  saveData():void{
    const acollection = collection(this.firestore,'students');
    addDoc(acollection,{
      'username': this.userform.value.username,
      'name' : this.userform.value.name,
      'email': this.userform.value.email,
      'phonenumber':this.userform.value.phonenumber,
      'password':this.userform.value.password,
    })   
  }
  resetForm():void{
  this.userform.reset({
    'username' : '',
    'name' : '',
    'email' : '',
    'phone_number' :'',
    'password':''

  })
 }  
 async createForm(){
  const auth = getAuth();
  createUserWithEmailAndPassword(auth,this.userform.value.email,this.userform.value.password).then((userCredential)=>{
    const user = userCredential.user;
    console.log("Account Created Successfully");
    this.router.navigate(['/login']);
  }).catch((error)=>{
    console.log(error);
  });

}

 submitForm(): void {
    alert(this.userform.value.username);
    this.saveData();
    this.createForm();
    this.resetForm();   
  }  
}
