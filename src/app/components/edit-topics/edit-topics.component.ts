import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { FileService } from '../../services/file.service';
import { Subject, Topic } from '../../shared/models';

@Component({
  selector: 'app-edit-topics',
  templateUrl: './edit-topics.component.html',
  styleUrls: ['./edit-topics.component.css'],
})
export class EditTopicsComponent implements OnInit {
  form!: FormGroup;
  canClose = true;
  subject$!: Observable<Subject[]>;
  currtopic!: Topic;

  constructor(
    private dialogRef: MatDialogRef<EditTopicsComponent>,
    private fb: FormBuilder,
    private fileService: FileService,
    @Inject(MAT_DIALOG_DATA) topic: Topic
  ) {
    this.currtopic = topic;
    this.form = this.fb.group({
      subject: [this.currtopic.subject_name, Validators.required],
      topic: [this.currtopic.topic_name, Validators.required],
    });
  }

  ngOnInit(): void {
    this.subject$ = this.fileService.loadSubjects();
  }

  save() {
    let changes: Partial<Topic> = {};
    changes.subject_name = this.form.value.subject;
    changes.topic_name = this.form.value.topic;
    changes.topic_code = `${this.form.value.subject.substr(
      -5,
      4
    )}-${this.form.value.topic.substr(0, 4)}`;

    this.fileService.updateTopic(this.currtopic.id!, changes).subscribe(() => {
      this.dialogRef.close(changes);
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  get subject() {
    return this.form.controls['subject'];
  }

  get topic() {
    return this.form.controls['topic'];
  }
}
