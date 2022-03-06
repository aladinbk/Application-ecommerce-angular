import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Client} from '../offres/model/client.model';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ClientService {
  url = 'http://localhost:8583';
  constructor(private httpClient: HttpClient) { }
  public register(client: Client): Observable<any> {
    return this.httpClient.post(this.url + '/addclient', client);
  }
  public authenticate(client: Client): Observable<Client> {
    return this.httpClient.post<Client>(this.url + '/login ', client);
  }
}
