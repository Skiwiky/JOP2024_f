import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OffersComponent } from './component/offers/offers.component';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { ProfilComponent } from './component/profil/profil.component';
import { AuthGuardService } from './services/authGuard/auth-guard.service';
import { AdminComponent } from './component/admin/admin.component';
import { CGUComponent } from './component/cgu/cgu.component';
import { PanierComponent } from './component/panier/panier.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'boutique', component: OffersComponent },
  { path: 'connexion', component: LoginComponent },
  { path: 'profil', component: ProfilComponent,canActivate: [AuthGuardService], data: { roles: ['USER', 'ADMIN'] }},
  { path: 'admin', component:AdminComponent, canActivate: [AuthGuardService], data: { roles: ['ADMIN'] }},
  { path: 'cgu', component:CGUComponent},
  { path: 'panier', component: PanierComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
