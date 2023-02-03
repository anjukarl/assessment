import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { FileService } from '../../services/file.service';
import { Exam, Subject } from '../../shared/models';

@Component({
  selector: 'app-edit-subjects',
  templateUrl: './edit-subjects.component.html',
  styleUrls: ['./edit-subjects.component.css'],
})
export class EditSubjectsComponent implements OnInit {
  form!: FormGroup;
  canClose = true;
  exams$!: Observable<Exam[]>;
  subject!: Subject;

  constructor(
    private dialogRef: MatDialogRef<EditSubjectsComponent>,
    private fb: FormBuilder,
    private fileService: FileService,
    @Inject(MAT_DIALOG_DATA) subject: Subject
  ) {
    this.subject = subject;
    this.form = this.fb.group({
      exam_name: [subject.exam_name, Validators.required],
      subject_code: [subject.subject_code, Validators.required],
      subject_name: [subject.subject_name, Validators.required],
    });
  }

  ngOnInit(): void {
    this.exams$ = this.fileService.loadExams();
  }

  save() {
    const changes = this.form.value;
    this.fileService.updateSubject(this.subject.id!, changes).subscribe(() => {
      this.dialogRef.close(changes);
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  get exam_name() {
    return this.form.controls['exam_name'];
  }

  get subject_code() {
    return this.form.controls['subject_code'];
  }

  get subject_name() {
    return this.form.controls['subject_name'];
  }
}
