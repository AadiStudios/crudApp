import { Component,inject,ViewChild } from '@angular/core';
import { Firestore, getFirestore } from '@angular/fire/firestore';
import { getDocs,collection,doc }from 'firebase/firestore';
import { getAuth,signOut } from "firebase/auth";
import { ActivatedRoute,Router } from '@angular/router';
import { Subject } from 'rxjs';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';

export interface ColumnElement{
  'name':string;
  'email':string;
  'username':string;
  'phonenumber':number;
  'password':string;
}
 const ELEMENT_DATA: ColumnElement[] = [
  { 'name': 'aishu', 'email': 'aishu@gmail.com', 'username': 'aishu','phonenumber':9840414445,'password':'test123'},
  { 'name': 'aadithya', 'email': 'aadi@gmail.com', 'username': 'aadisstudios','phonenumber':8946038320,'password':'aadi$$786'},
  { 'name': 'hari', 'email': 'hari@gmail.com', 'username': 'Hari','phonenumber':1233455662,'password':'system$$'},
  { 'name': 'afzal', 'email': 'afzal@gmail.com', 'username': 'afzal','phonenumber':1234556677,'password':'test$$123'},
  { 'name': 'saran', 'email': 'saran@gmail.com', 'username': 'saran','phonenumber':1223445561,'password':'system123'},

];

@Component({
  selector: 'app-index-user',
  templateUrl: './index-user.component.html',
  styleUrls: ['./index-user.component.css'],})


export class  IndexUserComponent {
  
  displayedColumns: string[] = ['name', 'email', 'username', 'phonenumber','password'];
  dataSource= new MatTableDataSource<ColumnElement>(ELEMENT_DATA);
  public loading$ = new Subject<boolean>();
  firestore:Firestore = inject(Firestore);
  docRef = collection(this.firestore,'students');
  my_hash = new Map<'string','string'>();



  async myfunc(){
    const userRecords = await getDocs(this.docRef);  
    userRecords.forEach(doc=>{
      // type Hash<>={[key:string]:string};
      // const myHash: ColumnElement[]=[{
      //   'name':doc.data()['name'],
      //   'email':doc.data()['email'],
      //   'username':doc.data()['username'],
      //   'password':doc.data()['password'],
      //   'phonenumber':doc.data()['phonenumber']
      // }] ;
      
     
      // console.log(doc.data()["name"]);
     ELEMENT_DATA.push({
      'name':doc.data()['name'],
      'email':doc.data()['email'],
      'username':doc.data()['username'],
      'password':doc.data()['password'],
      'phonenumber':doc.data()['phonenumber']
    });
   
    
      
  })

    this.dataSource.data=ELEMENT_DATA;
  console.log(ELEMENT_DATA);
}


// addRow(){
// const newRow : Person = {name:'New Person', email:'example',username:'example',phonenumber:'9840414445',password:'exam123'}
// this.dataSource.push(newRow);
// }

ngOnInit(){
this.myfunc();
this.loading$.next(true);

}
onRowClicked(row:any){
console.log("row is clicked",row);
}


}

