import {Injectable} from '@angular/core';
import {Order} from '../offres/model/Order.model';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import {CaddyService} from './caddy.service';
import {Client} from '../offres/model/client.model';
import {CatalogueService} from '../catalogue.service';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class OrdreService {
  public order: Order = new Order();


  constructor(private httpClient: HttpClient,
              private route: ActivatedRoute, private router: Router,
              public authService: AuthenticationService,
              private caddyService: CaddyService,
              private catalService: CatalogueService,
              private http: HttpClient) {
  }


  public setClient(client: Client) {
    this.order.client = client;
  }

  public loadOffresFromCaddy() {
    this.order.achatsItems = [];
    console.log(this.caddyService.getCaddy().items);
    this.caddyService.getCaddy().items.forEach(
      (element) =>
        this.order.achatsItems.push(element));
    console.log(this.order.achatsItems);
  }

  public getTotal(): number {
    let total = 0;
    this.order.achatsItems.forEach(p => {
      total += p.price * p.quantity;
    });
    return total;
  }

  submitOrder() {
    console.log(this.order);
    return this.httpClient.post(this.catalService.host + '/orders', this.order);
  }

  public getOrder(id): Observable<Order> {
    return this.httpClient.get<Order>(this.catalService.host + '/orders/' + id);
  }

  getCommandes() {
    return this.http.get('http://localhost:8583/listcommandes');
  }
  
  getCommandesdeals() {
    return this.http.get('http://localhost:8583/listcommandesdeals');
  }
  getNBCommandes() {
    return this.http.get('http://localhost:8583/commande/count');
  }

  getNBClients() {
    return this.http.get('http://localhost:8583/client/count');
  }

  passerCommande(order: Order): Observable<any> {
    return this.httpClient.post('http://localhost:8583/commande', order);
  }
}
