import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    MatButton
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

  constructor(protected authService: AuthService) {
  }
}
