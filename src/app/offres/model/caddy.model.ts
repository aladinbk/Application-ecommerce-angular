import { OffreItem } from './offre-item.model';
import { Client } from './client.model';

export class Caddy {

  public name: string;
  public items: Map<number, OffreItem> = new Map();
  public client: Client;

    constructor (name: string) {
      this.name = name;

    }





}
