import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { OffersComponent } from './component/offers/offers.component';
import { ProfilComponent } from './component/profil/profil.component';
import { LoginComponent } from './component/login/login.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { AdminComponent } from './component/admin/admin.component';
import { AuthInterceptor } from './interceptor/error/auth.interceptor';
import { TokenResfreshInterceptor } from './interceptor/tokenRefresh/token-resfresh.interceptor';
import { BankBlocComponent } from './component/profil/bank-bloc/bank-bloc.component';
import { CGUComponent } from './component/cgu/cgu.component';
import { PanierComponent } from './component/panier/panier.component';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OffersComponent,
    ProfilComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    AdminComponent,
    BankBlocComponent,
    CGUComponent,
    PanierComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule, 
    AppRoutingModule,
    QRCodeModule
  ],
  providers: [
   // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
   // {provide: HTTP_INTERCEPTORS, useClass: TokenResfreshInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  
 }
