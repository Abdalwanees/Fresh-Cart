import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { DetailComponent } from './components/details/detail.component';
import { WishlisComponent } from './components/wishlis/wishlis.component';
import { CartComponent } from './components/cart/cart.component';
import { NavBlankLayoutComponent } from './components/nav-blank-layout/nav-blank-layout.component';
import { NavAuthLayoutComponent } from './components/nav-auth-layout/nav-auth-layout.component';
import { BrandsComponent } from './components/brands/brands.component';
import { authGuard } from './shared/guard/auth.guard';
import { SearchComponent } from './components/search/search.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { BrandsDetailsComponent } from './components/brands-details/brands-details.component';
import { CategoryDetailsComponent } from './components/category-details/category-details.component';
import { CategoryComponent } from './components/category/category.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [

{path:'',
canActivate: [authGuard],
component:NavBlankLayoutComponent,

children:[
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'product',component:ProductComponent},
  {path:'details/:id',component:DetailComponent},
  {path:'search',component:SearchComponent},
  {path:'wishlist',component:WishlisComponent},
  {path:'cart',component:CartComponent},
  {path:'checkout/:id',component:CheckoutComponent},
  {path:'brands',component:BrandsComponent},
  {path:'allorders',component:AllordersComponent},
  {path:'brandDetails/:id',component:BrandsDetailsComponent},
  {path:'category',component:CategoryComponent},
  {path:'categoryDetails',component:CategoryDetailsComponent},
]},

{path:'',component:NavAuthLayoutComponent,children:[

{path:'login',component:LoginComponent},
{path:'register',component:RegisterComponent},
]},

{path:'**' , component:NotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
