import {Component, Input} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {Location, NgIf} from "@angular/common";
import {TaskService} from "../service/task.service";
import {AuthService} from "../service/auth.service";
import {FormsModule} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-create-note',
  standalone: true,
  imports: [
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    NgIf,
    FormsModule
  ],
  templateUrl: './create-note.component.html',
  styleUrl: './create-note.component.css'
})
export class CreateNoteComponent {

  @Input()
  title = "";

  @Input()
  content = "";

  @Input()
  isUpdateMode = false;

  @Input()
  taskId: string | null = null;

  constructor(private taskService: TaskService,
              private route: ActivatedRoute,
              private location: Location ,
              private authService: AuthService) {
  }

  goBack() {
    this.location.back();
  }

  async saveOrUpdateNote(txtTitle: HTMLInputElement, txtArea: HTMLTextAreaElement){
    if (!this.title.trim().length) {
      txtTitle.select();
      txtTitle.focus();
    }else if (!this.content.trim().length) {
      txtArea.select();
      txtArea.focus();
    }else if (this.isUpdateMode) {
      try {
        await this.taskService.updateTask(this.taskId!, this.title, this.content);
        alert("Successfully Update the Note");
      }catch (e) {
        console.log(e);
        alert("Failed to update the note, try again !")
      }
    }else {
      try {
        await this.taskService.createNewTask(this.title, this.content,
          this.authService.getPrincipalEmail()!);
        this.resetForm();
        txtTitle.focus();
        alert("Successfully Save the Note");
      } catch (e) {
        console.log(e);
        alert("Failed to save the note, try again !");
      }
    }
  }

  resetForm() {
    this.isUpdateMode = false;
    this.title = "";
    this.content = "";
    this.taskId = null;
  }
}
