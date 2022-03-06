import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OrdreService } from '../services/ordre.service';
import { Order } from '../offres/model/Order.model';
import { HttpHeaders } from '@angular/common/http';
const httpOptions : any    = {
  headers: new HttpHeaders({
    //'Content-Type':  'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Origin': '*'
  })
};
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  paymentAmount:number;
  currentOrder:Order;
  constructor(private router:Router, private route:ActivatedRoute,
    private ordreService:OrdreService) { }

  ngOnInit() {
    let id=this.route.snapshot.params.orderID;
    this.ordreService.getOrder(id).subscribe(data=>{
      this.currentOrder=data;
      console.log(this.currentOrder);
    },err=>{
      console.log(err);
    })
  }
  onParOrder(data) {
    console.log(data);
  }

}
