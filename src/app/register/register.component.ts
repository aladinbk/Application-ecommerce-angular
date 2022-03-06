import {Component, OnInit} from '@angular/core';
import {Client} from '../offres/model/client.model';
import {ClientService} from '../services/client.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  client = new Client();
  confirmPwd: any;
  existEmail;
  constructor(private clientService: ClientService,
              private router: Router) {
  }

  ngOnInit() {
  }

  register() {
    this.clientService.register(this.client).subscribe(res => {
      if (res.success) {
        this.router.navigate(['/login']);
      } else {
          this.existEmail = res.message;
      }
    }, ex => console.log(ex));
  }


}
