import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Client} from '../offres/model/client.model';
import {ClientService} from '../services/client.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  client = new Client();
  errorMessage;

  constructor(private clientService: ClientService,
              private router: Router) {
  }

  ngOnInit() {
  }

  onLogin(dataForm: any) {
    this.clientService.authenticate(this.client).subscribe(res => {
    console.log(this.client);
        if (res) {
          localStorage.setItem('currentUser', JSON.stringify(res));
          if (res.role === 'Admin') {
            this.router.navigateByUrl('home');
          } else {
            this.router.navigateByUrl('ledeal.tn');
          }

        } else {
          this.errorMessage = 'Attention: Merci de vérifier votre ' +
            'login ou mot de passe';
        }
      },
      ex => {
        console.log(ex);
      }
    );
  }
}
