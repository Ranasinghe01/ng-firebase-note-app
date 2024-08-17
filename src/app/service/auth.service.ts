import { Injectable } from '@angular/core';
import {Auth, authState, signInWithPopup, User, GoogleAuthProvider, signOut} from "@angular/fire/auth";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private initialized = false;

  private user: User | null = null;

  constructor(private auth: Auth, private routerService: Router) {
    authState(auth).subscribe(
      (user: User | null) => {
        this.user = user;
        this.initialized = true;
        if (user) {
          routerService.navigateByUrl('/');
        }else {
          routerService.navigateByUrl('/sign-in');
        }
      }
    )
  }

  getPrinciple() {
    return this.user;
  }

  getPrincipalEmail(){
    return this.user?.email ??
      this.user?.providerData?.at(0)?.email;
  }

  signIn() {
    signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  signOut() {
    signOut(this.auth);
  }

  isInitialized() {
    return this.initialized;
  }

}
