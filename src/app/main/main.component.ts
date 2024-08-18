import { Component } from '@angular/core';
import {BarComponent} from "../bar/bar.component";
import {DatePipe, NgIf} from "@angular/common";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {
  MatCard,
  MatCardContent,
  MatCardFooter,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {Task, TaskService} from "../service/task.service";
import {AuthService} from "../service/auth.service";
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {CreateNoteComponent} from "../create-note/create-note.component";
import {MatIcon} from "@angular/material/icon";
import {MatChip, MatChipSet} from "@angular/material/chips";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    BarComponent,
    NgIf,
    MatFormField,
    MatLabel,
    MatInput,
    MatButton,
    MatCard,
    MatCardTitle,
    MatCardSubtitle,
    DatePipe,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    CreateNoteComponent,
    MatIcon,
    MatCardHeader,
    MatCardContent,
    MatCardFooter,
    MatChipSet,
    MatChip,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  taskArray: Array<Task & { formattedDate?: Date }> = [];
  isLoading = true;

  constructor(private authService: AuthService,
              private router: Router,
              protected taskService: TaskService) {

    taskService.getTask(authService.getPrinciple()?.email!).subscribe(taskArray => {
      this.taskArray = taskArray.map(task => ({
        ...task,
        formattedDate: task.timestamp.toDate()
      }));
      this.isLoading = false;
      //get sorting task list
      this.taskArray.sort((task1: Task, task2: Task) => {
        if (task1.timestamp.toMillis() < task2.timestamp.toMillis()) return 1
        else if (task1.timestamp.toMillis() === task2.timestamp.toMillis()) return 0;
        else {
          return -1;
        }
      });
    });
  }

  onCardClick(noteId: string) {
    this.router.navigate(['/view-note', noteId]).then(success => {
      if (success) {
        console.log("Navigation Successful");
      }else {
        console.log("Navigation Failed");
      }
    });
  }

  onEditClick(noteId: string) {
    console.log(noteId);
    this.router.navigate(['/update-note', noteId]).then(success => {
      if (success) {
        console.log("Navigation Successful");
      }else {
        console.log("Navigation Failed");
      }
    })
  }
}
