import { Routes } from '@angular/router';
import {SignInComponent} from "./sign-in/sign-in.component";
import {MainComponent} from "./main/main.component";
import {authGuard} from "./auth.guard";
import {CreateNoteComponent} from "./create-note/create-note.component";
import {UpdateNoteComponent} from "./update-note/update-note.component";
import {ViewNoteComponent} from "./view-note/view-note.component";

export const routes: Routes = [
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: '',
    canActivate: [authGuard],
    component: MainComponent
  },
  {
    path: 'create-note',
    component: CreateNoteComponent
  },
  {
    path: 'view-note/:noteId',
    component: ViewNoteComponent
  },
  {
    path: 'update-note/:noteId',
    component: UpdateNoteComponent
  }
];
