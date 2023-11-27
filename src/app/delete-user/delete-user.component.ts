import { Component,inject,ViewChild } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { getDoc,updateDoc,collection,doc,deleteField,deleteDoc}from 'firebase/firestore';
import {  Firestore } from '@angular/fire/firestore';
import { ɵNgNoValidate } from '@angular/forms';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent {
  id:string="";
  firestore:Firestore=inject(Firestore);
  username:string="";
  name:string="";
  email:string="";
  phonenumber:string="";
  password:string="";
  @ViewChild("deleteUserForm") userform:any;

  constructor(private route: ActivatedRoute, private router : Router){
   
}
async readRecord(){
   const  docRef = doc(this.firestore,'students',this.id);
   const docSnap = await getDoc(docRef);
   if (docSnap.exists()){
   this.username= docSnap.data()['username'];
   this.name=docSnap.data()['name'];
   this.email = docSnap.data()['email'];
   this.phonenumber=docSnap.data()['phonenumber'];
   this.password=docSnap.data()['password'];

   }

}; 
ngOnInit(){
  this.route.params.subscribe(params=>{
      this.id = params['id'];
   });
   this.readRecord();
}
async deleteValues()
{
  const  docRef = collection(this.firestore,'students');
  await deleteDoc(doc(docRef,this.id));
  
  // await updateDoc(doc(docRef,this.id),{
  //   name: deleteField(),
  //   email:deleteField(),
  //   phonenumber:deleteField(),
  //   username: deleteField(),
  //  });
  
  }


deleteForm(){
  this.deleteValues();
  alert('Values deleted');
  this.router.navigate(['/index']);
  }

}
