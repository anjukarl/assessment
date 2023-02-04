import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { FileService } from '../../services/file.service';
import { Exam, Subject } from '../../shared/models';

@Component({
  selector: 'app-add-subjects',
  templateUrl: './add-subjects.component.html',
  styleUrls: ['./add-subjects.component.css'],
})
export class AddSubjectsComponent implements OnInit {
  form!: FormGroup;
  canClose = true;
  exams$!: Observable<Exam[]>;

  constructor(
    private dialogRef: MatDialogRef<AddSubjectsComponent>,
    private fb: FormBuilder,
    private fileService: FileService
  ) {
    this.form = this.fb.group({
      exam_name: ['', Validators.required],
      subject_name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.exams$ = this.fileService.loadExams();
  }

  save() {
    this.saveSubjectInfo();
    this.dialogRef.close();
  }

  cancel() {
    this.dialogRef.close();
  }

  saveSubjectInfo() {
    let newSubject: Partial<Subject> = {};
    newSubject = this.form.value;
    this.fileService.createSubject(newSubject);
  }

  get exam_name() {
    return this.form.controls['exam_name'];
  }

  get subject_name() {
    return this.form.controls['subject_name'];
  }
}
