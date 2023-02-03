import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { FileService } from '../../services/file.service';
import { Univ, Exam } from '../../shared/models';

@Component({
  selector: 'app-add-exams',
  templateUrl: './add-exams.component.html',
  styleUrls: ['./add-exams.component.css'],
})
export class AddExamsComponent implements OnInit {
  form!: FormGroup;
  canClose = true;
  univs$!: Observable<Univ[]>;

  constructor(
    private dialogRef: MatDialogRef<AddExamsComponent>,
    private fb: FormBuilder,
    private fileService: FileService
  ) {
    this.form = this.fb.group({
      univ: ['', Validators.required],
      exam: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.univs$ = this.fileService.loadUnivs();
  }

  save() {
    this.saveExamInfo();
    this.dialogRef.close();
  }

  cancel() {
    this.dialogRef.close();
  }

  saveExamInfo() {
    let newExam: Partial<Exam> = {};
    newExam.univ_name = this.form.value.univ;
    newExam.exam_name = `${this.form.value.univ} - ${this.form.value.exam}`;
    this.fileService.createExam(newExam);
  }

  get univ() {
    return this.form.controls['univ'];
  }

  get exam() {
    return this.form.controls['exam'];
  }
}
