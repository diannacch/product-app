import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/_components/home/home.component';
import { EditProductComponent } from './modules/home/_components/edit-product/edit-product.component';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "edit-product/:id", component: EditProductComponent },
  { path: '', redirectTo: "/home", pathMatch: "full" },
  { path: "**", redirectTo: "/home" }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
