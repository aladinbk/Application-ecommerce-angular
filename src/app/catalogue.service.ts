import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Offre} from './offres/model/offre.model';
import {Client} from './offres/model/client.model';
import { Order } from './offres/model/Order.model';

const httpOptions: any = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable()

export class CatalogueService {
  public host = 'http://localhost:8583';

  constructor(private http: HttpClient) {
  }

  public getRessource(url) {
    return this.http.get(this.host + url);
  }

  public saveRessource(url, data) {
    return this.http.post(url, data);
  }

  public saveRessource2(url, data) {
    return this.http.post('http://localhost:8583/addcat', data);
  }

  public getRessource2(url) {
    return this.http.get(this.host + url);
  }

  getClients() {
    return this.http.get('http://localhost:8583/listclients');
  }
  getproducts() {
    return this.http.get('http://localhost:8583/listOffres');
  }
  getClient(id: number) {
    return this.http.get("http://localhost:8583/Client/"+ id);
  }
 
  updateclient(client: Client) {
    return this.http.put('http://localhost:8583/clients/' + client.id, client);
  }

  getcommande(id: number) {
    return this.http.get("http://localhost:8583/orders/"+ id);
  }
  updatecommande(order: Order) {
    return this.http.put('http://localhost:8583/commandes/'+ order.id, order);
  }
  getonecategorie(id_c: number) {
    return this.http.get("http://localhost:8583/Category/"+ id_c);
  }
  updatecategory(category:any ) {
    return this.http.put('http://localhost:8583/modcategorie/'+ category.id_c, category);
  }

  public getOffre(url): Observable<Offre> {
    return this.http.get<Offre>(url);
  }


  public getOff(page: number, size: number): Observable<Offre> {
    return this.http.get<Offre>(this.host + '/offreses?page=' + page + '&size=' + size);
  }

  public getOffpagebyKey(mc: string, page: number, size: number): Observable<Offre> {
    return this.http.get<Offre>(this.host + '/offreses/search/byNamepage?mc=' + mc + '&page=' + page + '&size=' + size);
  }
  public getclientpagebyKey(mc: string): Observable<Client> {
    return this.http.get<Client>(this.host + "/clients/search/clientByKeyword?mc=" + mc );
  }
  public deleteOffre(url) {
    return this.http.delete(url);
  }

  public deletecat(url) {
    return this.http.delete(url);
  }
  public deleteclient(id :number) {
    return this.http.delete('http://localhost:8583/deleteclient/'+id);
  }

  uploadPhotoOffre(file: File, idOffre): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    formdata.append('file', file);

    const req = new HttpRequest('POST', this.host + '/uploadPhoto/' + idOffre, formdata, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req);
  }

  uploadPhoto(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    formdata.append('file', file);

    const req = new HttpRequest('POST', this.host + '/uploadphotoOffre', formdata, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req);
  }

  public pathRessource(url, data) {
    return this.http.patch(url, data);
  }


}
