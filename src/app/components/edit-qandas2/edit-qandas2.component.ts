import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { FileService } from '../../services/file.service';
import { Exam, Subject, Topic, QandA } from '../../shared/models';

@Component({
  selector: 'app-edit-qandas2',
  templateUrl: './edit-qandas2.component.html',
  styleUrls: ['./edit-qandas2.component.css'],
})
export class EditQandas2Component implements OnInit {
  form!: FormGroup;
  canClose = true;
  exam$!: Observable<Exam[]>;
  subject$!: Observable<Subject[]>;
  topic$!: Observable<Topic[]>;
  currqanda!: QandA;

  constructor(
    private dialogRef: MatDialogRef<EditQandas2Component>,
    private fb: FormBuilder,
    private fileService: FileService,
    @Inject(MAT_DIALOG_DATA) qanda: QandA
  ) {
    this.currqanda = qanda;
    this.form = this.fb.group({
      exam_name: [this.currqanda.exam_name, Validators.required],
      subject_name: [this.currqanda.subject_name, Validators.required],
      topic_code: [this.currqanda.topic_code],
      year: [this.currqanda.year, Validators.required],
      marks: [this.currqanda.marks, Validators.required],
    });
  }

  ngOnInit(): void {
    this.exam$ = this.fileService.loadExams();
    this.subject$ = this.fileService.loadSubjects();
    this.topic$ = this.fileService.loadTopics();
  }

  save() {
    const changes = this.form.value;
    this.fileService.updateQandA(this.currqanda.id!, changes).subscribe(() => {
      this.dialogRef.close(changes);
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  get exam_name() {
    return this.form.controls['exam_name'];
  }

  get subject_name() {
    return this.form.controls['subject_name'];
  }

  get year() {
    return this.form.controls['year'];
  }

  get marks() {
    return this.form.controls['marks'];
  }
}
