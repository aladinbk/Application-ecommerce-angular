import { Injectable } from '@angular/core';
import { Caddy } from '../offres/model/caddy.model';
import { Offre } from '../offres/model/offre.model';
import { OffreItem } from '../offres/model/offre-item.model';
import { Client } from '../offres/model/client.model';

@Injectable()
export class CaddyService {
  currentCaddyName = 'caddy1';
  public caddies: Map<string, Caddy> = new Map();

  constructor() {
        const caddies = localStorage.getItem('myCaddies');
        const caddy = new Caddy(this.currentCaddyName);
        this.caddies.set(this.currentCaddyName, caddy);
}

  public onAddOffreToCaddy(offres: Offre): void {
  const caddy = this.caddies.get(this.currentCaddyName);
  let offreItem: OffreItem = caddy.items.get(offres.id);
  if (offreItem) {
    offreItem.quantity += offres.quantity;
  } else {
    offreItem = new OffreItem();
    offreItem.price = offres.currentprice;
    offreItem.quantity = offres.quantity;
    offreItem.offres = offres;
    caddy.items.set(offres.id, offreItem);
    this.saveCaddies();
  }
  }

  getCurentCaddy(): Caddy {
  return this.caddies.get(this.currentCaddyName);
  }

  getTotalCurrentCaddy() {
  const caddy = this.caddies.get(this.currentCaddyName);
  console.log(caddy);
  let total = 0;
    caddy.items.forEach(
    (element) => total += element.price * element.quantity);

  return total;

  }




  public saveCaddies() {
    localStorage.setItem('myCaddies', JSON.stringify(this.caddies));
  }
  public getCaddy(): Caddy {
    const caddy = this.caddies.get(this.currentCaddyName);
    return caddy;
  }
  setClient(client: Client) {
 this.getCaddy().client = client;
 this.saveCaddies();
  }
}
