import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAdminSubject = new BehaviorSubject<boolean>(false);
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  isAdmin$ = this.isAdminSubject.asObservable();
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  login(username: string, password: string): boolean {
    // Demo login logic
    if (username === 'admin' && password === 'admin') {
      this.isAdminSubject.next(true);
      this.isLoggedInSubject.next(true);
      return true;
    } else if (username === 'user' && password === 'user') {
      this.isAdminSubject.next(false);
      this.isLoggedInSubject.next(true);
      return true;
    }
    return false;
  }

  logout() {
    this.isAdminSubject.next(false);
    this.isLoggedInSubject.next(false);
  }
}