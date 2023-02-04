import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { FileService } from '../../services/file.service';
import { Subject, Topic } from '../../shared/models';

@Component({
  selector: 'app-add-topics',
  templateUrl: './add-topics.component.html',
  styleUrls: ['./add-topics.component.css'],
})
export class AddTopicsComponent implements OnInit {
  form!: FormGroup;
  canClose = true;
  subject$!: Observable<Subject[]>;

  constructor(
    private dialogRef: MatDialogRef<AddTopicsComponent>,
    private fb: FormBuilder,
    private fileService: FileService
  ) {
    this.form = this.fb.group({
      subject: ['', Validators.required],
      topic: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.subject$ = this.fileService.loadSubjects();
  }

  save() {
    this.saveTopicInfo();
    this.dialogRef.close();
  }

  cancel() {
    this.dialogRef.close();
  }

  saveTopicInfo() {
    let newTopic: Partial<Topic> = {};
    newTopic.subject_name = this.form.value.subject;
    newTopic.topic_name = this.form.value.topic;
    newTopic.topic_code = `${this.form.value.subject.substr(
      -5,
      4
    )}-${this.form.value.topic.substr(0, 4)}`;
    this.fileService.createTopic(newTopic);
  }

  get subject() {
    return this.form.controls['subject'];
  }

  get topic() {
    return this.form.controls['topic'];
  }
}
