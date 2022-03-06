import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OffresComponent} from './offres/offres.component';
import {LoginComponent} from './login/login.component';
import {OffresDetailsComponent} from './offres-details/offres-details.component';
import {CaddiesComponent} from './caddies/caddies.component';
import {HomeComponent} from './home/home.component';
import {UserinterfaceComponent} from './userinterface/userinterface.component';
import {NewOffreComponent} from './new-offre/new-offre.component';
import {DetailsComponent} from './details/details.component';
import {ClientComponent} from './client/client.component';
import {DealsComponent} from './deals/deals.component';
import {DealsDetailsComponent} from './deals-details/deals-details.component';
import {PaymentComponent} from './payment/payment.component';
import {BestSellerComponent} from './best-seller/best-seller.component';
import {BlogpostFeaturedComponent} from './blogpost-featured/blogpost-featured.component';
import {FooterComponent} from './footer/footer.component';
import {AddcatComponent} from './addcat/addcat.component';
import {RegisterComponent} from './register/register.component';
import {AdminGuard} from './guards/admin.guard';
import {ClientGuard} from './guards/client.guard';
import { NewClientComponent } from './new-client/new-client.component';
import { EditclientComponent } from './editclient/editclient.component';
import {FactureComponent} from './facture/facture.component';
import { InfosclientComponent } from './infosclient/infosclient.component';
import { AccountComponent } from './account/account.component';
import { ExiperdComponent } from './exiperd/exiperd.component';
import { EditcommandeComponent } from './editcommande/editcommande.component';
import { EditcatComponent } from './editcat/editcat.component';


const routes: Routes = [
  {path: 'offres/:p1/:p2', component: OffresComponent},
  {path: 'deals/:p1/:p2', component: DealsComponent},
  {path: '', redirectTo: '/ledeal.tn', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, canActivate: [AdminGuard]},
  {path: 'add-deal', component: NewOffreComponent, canActivate: [AdminGuard]},
  {path: 'ledeal.tn', component: UserinterfaceComponent},
  {path: 'offres/1/0', component: OffresComponent , canActivate: [AdminGuard]},
  {path: 'deals/1/0', component: DealsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'offres-details/:url', component: OffresDetailsComponent , canActivate: [AdminGuard]},
  {path: 'deals-details/:url', component: DealsDetailsComponent },
  {path: 'details/:url', component: DetailsComponent},
  {path: 'caddies', component: CaddiesComponent , canActivate: [ClientGuard]},
  {path: 'payment/:orderID', component: PaymentComponent , canActivate: [ClientGuard]},
  {path: 'Gestion-clients', component: BestSellerComponent},
  {path: 'Gestion-commandes', component: BlogpostFeaturedComponent},
  {path: 'edit-client/:id', component: FooterComponent},
  {path: 'editcommande/:id', component: EditcommandeComponent},
  {path: 'editcategory/:id_c', component: EditcatComponent},
  {path: 'Gestion-categories', component: AddcatComponent},
  {path: 'client', component: ClientComponent},
  {path: 'facture/:cmd', component: FactureComponent},
  {path: 'add-client', component: NewClientComponent},
  {path: 'editclient/:id', component: EditclientComponent},
  {path: 'infosclient', component: InfosclientComponent , canActivate: [ClientGuard]},
  {path: 'Account', component:AccountComponent , canActivate: [AdminGuard]},
  {path: 'expired', component: ExiperdComponent},
  {path: 'register-client', component: RegisterComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule {
}
