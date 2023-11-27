import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from './create-user/create-user.component';
import { IndexUserComponent } from './index-user/index-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { LoginPageComponent } from './login-page/login-page.component';
const routes: Routes = [
  {path:'create', component:CreateUserComponent},
  {path:'index', component:IndexUserComponent},
  {path:'edit/:id',component:EditUserComponent},
  {path: 'delete/:id',component:DeleteUserComponent},
  {path: 'login',component:LoginPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
