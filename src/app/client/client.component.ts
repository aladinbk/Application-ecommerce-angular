import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {OrdreService} from '../services/ordre.service';
import {CaddyService} from '../services/caddy.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  public mode = 0;
  panelStyle: String = 'panel-default';

  constructor(private router: Router,
              private authService: AuthenticationService,
              public ordreService: OrdreService,
              public caddyService: CaddyService) {
  }

  ngOnInit() {
  }

  onOrder() {
    this.ordreService.submitOrder().subscribe(data => {
      console.log('hhh');
      console.log(data);
      this.ordreService.order.id = data['id'];
      this.ordreService.order.date = data['date'];
      this.panelStyle = 'panel-success';
    }, err => {
      console.log(err);
    });
  }

  onPayOrder() {
    this.router.navigateByUrl('/payment/' + this.ordreService.order.id);
  }
}
