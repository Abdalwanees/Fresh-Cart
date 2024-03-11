import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBlankLayoutComponent } from './components/nav-blank-layout/nav-blank-layout.component';
import { NavAuthLayoutComponent } from './components/nav-auth-layout/nav-auth-layout.component';
import { NavBlankComponent } from './components/nav-blank/nav-blank.component';
import { NavAuthComponent } from './components/nav-auth/nav-auth.component';
import { DetailComponent } from './components/details/detail.component';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { WishlisComponent } from './components/wishlis/wishlis.component';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CutTextPipe } from './shared/pipe/cut-text.pipe';
import { DiscountPipe } from './discount.pipe';
import { SearchPipe } from './search.pipe';
import { SearchComponent } from './components/search/search.component';
import { OffersPipe } from './offers.pipe';
import { TotalPricePipe } from './total-price.pipe';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrandsDetailsComponent } from './components/brands-details/brands-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgxSpinnerModule } from "ngx-spinner";
import { LoadingInterceptor } from './loading.interceptor';
import { CategoryDetailsComponent } from './components/category-details/category-details.component';
import { CategoryComponent } from './components/category/category.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBlankLayoutComponent,
    NavAuthLayoutComponent,
    NavBlankComponent,
    NavAuthComponent,
    DetailComponent,
    HomeComponent,
    ProductComponent,
    WishlisComponent,
    CartComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    BrandsComponent,
    CutTextPipe,
    DiscountPipe,
    SearchPipe,
    SearchComponent,
    OffersPipe,
    TotalPricePipe,
    CheckoutComponent,
    AllordersComponent,
    BrandsDetailsComponent,
    CategoryDetailsComponent,
    CategoryComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    CarouselModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    
  ],
  providers: [
    { provide:HTTP_INTERCEPTORS , useClass:LoadingInterceptor , multi:true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
