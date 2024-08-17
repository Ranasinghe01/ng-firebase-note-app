import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SignInComponent} from "./sign-in/sign-in.component";
import {AuthService} from "./service/auth.service";
import {LoaderComponent} from "./loader/loader.component";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SignInComponent, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(protected authService: AuthService,
              titleService: Title ) {
    titleService.setTitle("Loading My-Note App")
  }
}
