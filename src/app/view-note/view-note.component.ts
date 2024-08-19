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
import {DatePipe, Location, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";

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
    NgIf,
    MatButton
  ],
  templateUrl: './view-note.component.html',
  styleUrl: './view-note.component.css',
})
export class ViewNoteComponent implements OnInit{

  taskId: string | null = null;
  task: Task | undefined;
  progress = 0;

  constructor(private authService: AuthService,
              private route: ActivatedRoute,
              private location: Location,
              protected taskService: TaskService) {
  }

  goBack() {
    this.location.back();
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
    this.progress = 2;   // Start with an initial progress value
      const userEmail = this.authService.getPrinciple()?.email;
      if (userEmail) {
        this.taskService.getTaskById(userEmail, taskId)
          .subscribe({
            next: (task) => {
              if (task) {
                this.progress = 100;    // Set progress to 100% when task is loaded
                this.task = task;
              }else {
                this.progress = 0;    // Reset progress if no task is found
                console.log("Task not found");
              }
            },
            error: (error) => {
              console.log("Error loading task:", error);
            }
          });
        // Simulate progress increase over time until the task is loaded
        const calProgress = setInterval(() => {
          if (this.progress < 99) {
            this.progress += 1;
          }else {
            clearInterval(calProgress);   // Stop the simulation once it gets close to 100%
          }
        }, 10);
      }
  }
}
