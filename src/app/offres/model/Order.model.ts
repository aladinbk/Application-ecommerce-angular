import { Client } from './client.model';
import { OffreItem } from './offre-item.model';

export class Order {
    public id: number;
    public client: Client;
    public achatsItems: OffreItem[] ;
    public totalAmount: number;
    public date: Date;
}
