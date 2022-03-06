import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      if (currentUser.role === 'Admin') {
        return true;
      }
    }
    this.router.navigate(['/login']);
    return false;
  }
}
