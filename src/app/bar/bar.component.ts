import {AfterViewInit, Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {NgIf} from "@angular/common";
import {AuthService} from "../service/auth.service";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-bar',
  standalone: true,
  imports: [
    MatToolbar,
    MatIcon,
    NgIf,
    MatButton
  ],
  templateUrl: './bar.component.html',
  styleUrl: './bar.component.css'
})
export class BarComponent implements AfterViewInit{

  constructor(protected authService: AuthService) {
  }

  isMenuVisible = false;

  @ViewChild("profilePic")
  private profilePicElmRef! : ElementRef<HTMLDivElement>;

  ngAfterViewInit(): void {
    this.profilePicElmRef.nativeElement.
      style.backgroundImage = `url('${this.authService.getPrinciple()?.photoURL}')`;
  }

  /* to make menu invisible */
  @HostListener("document:click")
  onDocumentClick(event: MouseEvent) {
    this.isMenuVisible = false;
  }
}
