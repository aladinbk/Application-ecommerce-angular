import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {OrdreService} from '../services/ordre.service';
import {Order} from '../offres/model/Order.model';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.css']
})
export class FactureComponent implements OnInit {
  commande: Order ;

  constructor(private activatedRoute: ActivatedRoute,
              private OrderService: OrdreService) {
  }

  ngOnInit() {
    const cmd = this.activatedRoute.snapshot.paramMap.get('cmd');
    this.OrderService.getOrder(cmd).subscribe(data => {
      this.commande = data;
      console.log(this.commande);
    }, ex => console.log(ex));
  }
  getTotal() {
    const sum = this.commande.achatsItems
      .map(a =>  (a.offres.currentprice * a.quantity) ).reduce(function(a, b) {
        return a + b;
      });
    return sum;
  }
}
