import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn = false;
  public isLoggedIn$ = new BehaviorSubject<boolean>(false);
  private authsub: Subscription = new Subscription();

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  signIn(email: string, password: string) {
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.isLoggedIn$.next(true);
        this.router.navigate(['/assessments']);
      })
      .catch((err) => {
        this.isLoggedIn$.next(false);
      });
  }

  isAuthenticated() {
    this.authsub = this.isLoggedIn$.subscribe((val) => {
      this.loggedIn = val;
    });
    return this.loggedIn;
  }

  signOut() {
    this.isLoggedIn$.next(false);
    this.authsub.unsubscribe();
    this.afAuth.signOut();
    this.router.navigate(['/login']);
  }
}
