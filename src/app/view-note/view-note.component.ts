import {Component, OnInit} from '@angular/core';
import {
  MatCard,
  MatCardContent,
  MatCardFooter,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {MatChip, MatChipSet} from "@angular/material/chips";
import {Task, TaskService} from "../service/task.service";
import {AuthService} from "../service/auth.service";
import {ActivatedRoute} from "@angular/router";
import {DatePipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-view-note',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatCardFooter,
    MatChipSet,
    MatChip,
    MatCardSubtitle,
    DatePipe,
    NgIf
  ],
  templateUrl: './view-note.component.html',
  styleUrl: './view-note.component.css',
})
export class ViewNoteComponent implements OnInit{

  taskId: string | null = null;
  task: Task | undefined;

  constructor(private authService: AuthService,
              private route: ActivatedRoute,
              protected taskService: TaskService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.taskId = params.get('noteId');
      if (this.taskId) {
        this.loadTask(this.taskId);
      }else {
        console.log("No task ID found in the route");
      }
    });
  }

  private loadTask(taskId: string): void {
      const userEmail = this.authService.getPrinciple()?.email;
      if (userEmail) {
        this.taskService.getTaskById(userEmail, taskId)
          .subscribe({
            next: (task) => {
              this.task = task;
            },
            error: (error) => {
              console.error("Error loading task:", error);
            }
          });
      }
  }
}
