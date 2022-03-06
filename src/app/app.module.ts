import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {CatalogueService} from './catalogue.service';
import {OffresComponent} from './offres/offres.component';
import {LoginComponent} from './login/login.component';
import {AuthenticationService} from './services/authentication.service';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {OffresDetailsComponent} from './offres-details/offres-details.component';
import {CaddyService} from './services/caddy.service';
import {CaddiesComponent} from './caddies/caddies.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {HomeComponent} from './home/home.component';
import {UserinterfaceComponent} from './userinterface/userinterface.component';
import {NewOffreComponent} from './new-offre/new-offre.component';
import {BannerComponent} from './banner/banner.component';
import {BlogpostFeaturedComponent} from './blogpost-featured/blogpost-featured.component';
import {BestSellerComponent} from './best-seller/best-seller.component';
import {FootComponent} from './foot/foot.component';
import {DetailsComponent} from './details/details.component';
import {ClientComponent} from './client/client.component';
import {OrdreService} from './services/ordre.service';
import {DealsComponent} from './deals/deals.component';
import {DealsDetailsComponent} from './deals-details/deals-details.component';
import {PaymentComponent} from './payment/payment.component';
import {AddcatComponent} from './addcat/addcat.component';
import {RegisterComponent} from './register/register.component';
import {ClientService} from './services/client.service';
import {NumberOnlyDirective} from './directives/number-only.directive';
import {ClientGuard} from './guards/client.guard';
import {AdminGuard} from './guards/admin.guard';
import { NewClientComponent } from './new-client/new-client.component';
import { EditclientComponent } from './editclient/editclient.component';
import { FactureComponent } from './facture/facture.component';
import {NgxPrintModule} from 'ngx-print';
import { InfosclientComponent } from './infosclient/infosclient.component';
import { AccountComponent } from './account/account.component';
import { ExiperdComponent } from './exiperd/exiperd.component';
import { EditcommandeComponent } from './editcommande/editcommande.component';
import { EditcatComponent } from './editcat/editcat.component';
import { DatePipe } from '@angular/common';
import { AboutUsComponent } from './about-us/about-us.component';


@NgModule({
  declarations: [
    AppComponent,
    OffresComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    OffresDetailsComponent,
    CaddiesComponent,
    SidebarComponent,
    HomeComponent,
    UserinterfaceComponent,
    NewOffreComponent,
    BannerComponent,
    BlogpostFeaturedComponent,
    BestSellerComponent,
    FootComponent,
    DetailsComponent,
    ClientComponent,
    DealsComponent,
    DealsDetailsComponent,
    PaymentComponent,
    AddcatComponent,
    RegisterComponent,
    NumberOnlyDirective,
    NewClientComponent,
    EditclientComponent,
    FactureComponent,
    InfosclientComponent,
    AccountComponent,
    ExiperdComponent,
    EditcommandeComponent,
    EditcatComponent,
    AboutUsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPrintModule
  ],
  providers: [CatalogueService,DatePipe,
    AuthenticationService, CaddyService, OrdreService,
    ClientService,
    ClientGuard, AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
