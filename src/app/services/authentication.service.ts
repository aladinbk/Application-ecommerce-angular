import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class AuthenticationService {
  public isAuthenticated: boolean;
  public userAuthenticated;
  public token: string;
  private users = [
    {username: 'admin', password: '1234', roles: ['ADMIN', 'USER']},
    {username: 'user1', password: '1234', roles: ['USER']},
    {username: 'user2', password: '1234', roles: ['USER']},
  ];

  constructor(private router: Router) {
  }


  public login(username: string, password: string) {
    let user;
    this.users.forEach(u => {
      if (u.username == username && u.password == password) {
        user = u;
        this.token = btoa(JSON.stringify({username: u.username, roles: u.roles}));
      }
    });
    if (user) {
      this.isAuthenticated = true;
      this.userAuthenticated = user;
    } else {
      this.isAuthenticated = false;
      this.userAuthenticated = undefined;
    }
  }

  public isuser() {
    if (this.userAuthenticated) {
      if (this.userAuthenticated.roles.indexOf('USER') > -1) {
      //this.router.navigateByUrl("/ledeal.tn")
        return true;
      }
    }
    return false;
  }

  public isAdmin() {
    if (this.userAuthenticated) {
      if (this.userAuthenticated.roles.indexOf('ADMIN') > -1) {
        return true;
      }
    }
    return false;
  }


  public saveAuthenticatedUser() {
    if (this.userAuthenticated) {
      localStorage.setItem('authToken', this.token);
    }
  }

  public loadAuthenticatedUserFromLocalStorage() {
    const t = localStorage.getItem('authToken');
    if (t) {
      const user = JSON.parse(atob(t));
      console.log(user);
      this.userAuthenticated = {username: user.username, roles: user.roles};
      console.log(this.userAuthenticated);
      this.isAuthenticated = true;
      this.token = t;
    }
  }

  public removeTokenFromLocalStorage() {
    localStorage.removeItem('authToken');
    this.isAuthenticated = false;
    this.token = undefined;
    this.userAuthenticated = undefined;
  }
}
