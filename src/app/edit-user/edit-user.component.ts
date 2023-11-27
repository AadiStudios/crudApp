import { Component,inject,ViewChild } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { getDoc,setDoc,collection,doc }from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  id:string="";
  firestore:Firestore=inject(Firestore);
  username:string="";
  name:string="";
  email:string="";
  phonenumber:string="";
  password:string="";
  @ViewChild("editUserForm") userform:any;

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
async changeValues()
{
  const  docRef = collection(this.firestore,'students');
   await setDoc(doc(docRef,this.id),{
    'name':this.userform.value.name,
    'email':this.userform.value.email,
    'phonenumber':this.userform.value.phonenumber,
    'username': this.userform.value.username,
    'password': this.userform.value.password,
   })

}
editForm(){
this.changeValues();
alert('Values Edited');
this.router.navigate(['/index']);
}
}
