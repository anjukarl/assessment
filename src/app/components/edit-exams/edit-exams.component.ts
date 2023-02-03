import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { FileService } from '../../services/file.service';
import { Univ, Exam } from '../../shared/models';

@Component({
  selector: 'app-edit-exams',
  templateUrl: './edit-exams.component.html',
  styleUrls: ['./edit-exams.component.css'],
})
export class EditExamsComponent implements OnInit {
  form!: FormGroup;
  canClose = true;
  univs$!: Observable<Univ[]>;
  exam!: Exam;

  constructor(
    private dialogRef: MatDialogRef<EditExamsComponent>,
    private fb: FormBuilder,
    private fileService: FileService,
    @Inject(MAT_DIALOG_DATA) exam: Exam
  ) {
    this.exam = exam;
    this.form = this.fb.group({
      univ_name: [exam.univ_name, Validators.required],
      exam_name: [exam.exam_name, Validators.required],
    });
  }

  ngOnInit(): void {
    this.univs$ = this.fileService.loadUnivs();
  }

  save() {
    const changes = this.form.value;
    this.fileService.updateExam(this.exam.id!, changes).subscribe(() => {
      this.dialogRef.close(changes);
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  get univ_name() {
    return this.form.controls['univ_name'];
  }

  get exam_name() {
    return this.form.controls['exam_name'];
  }
}
