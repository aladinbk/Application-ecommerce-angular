import { Component, OnInit } from '@angular/core';
import { Client } from '../offres/model/client.model';
import { Router } from '@angular/router';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.css']
})
export class NewClientComponent implements OnInit {
  client = new Client();
  confirmPwd: any;
  existEmail;
  constructor(private clientService: ClientService,
    private router: Router) { }

  ngOnInit() {
  }
  register() {
    this.clientService.register(this.client).subscribe(res => {
      if (res.success) {
        alert('Client ajouté avec Succées');
        location.reload();
        this.router.navigate(['/Gestion-clients']);
      } else {
          this.existEmail = res.message;
      }
    }, ex => console.log(ex));
  }
}
