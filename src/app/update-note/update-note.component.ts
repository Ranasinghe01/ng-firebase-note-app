import {Component, OnInit} from '@angular/core';
import {CreateNoteComponent} from "../create-note/create-note.component";
import {Task, TaskService} from "../service/task.service";
import {AuthService} from "../service/auth.service";
import {FormsModule} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-update-note',
  standalone: true,
  imports: [
    CreateNoteComponent,
    FormsModule
  ],
  templateUrl: './update-note.component.html',
  styleUrl: './update-note.component.css'
})
export class UpdateNoteComponent implements OnInit{

  taskId: string | null = null;
  task: Task | undefined;
  progress: number = 0;

  constructor(protected taskService: TaskService,
              private route: ActivatedRoute,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.taskId = params.get('noteId');
      if (this.taskId) {
        this.loadTask(this.taskId);
      }else {
        console.log("No task Id found in the route");
      }
    });
  }

  private loadTask(taskId: string) {
    this.progress = 2;
    const userEmail = this.authService.getPrinciple()?.email;
    if (userEmail) {
      this.taskService.getTaskById(userEmail, taskId)
        .subscribe( {
          next: (task) => {
            if (task) {
              this.progress = 100;
              this.task = task;
            }else {
              this.progress = 0;
              console.log("Task not found");
            }
          },
          error: (error) => {
            console.log("Error loading task: ", error);
          }
      });
      const calProgress = setInterval(() => {
        if (this.progress < 99) {
          this.progress += 1;
        }else {
          clearInterval(calProgress);
        }
      }, 10);
    }
  }
}
