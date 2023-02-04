import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Observable } from 'rxjs';

import { FileService } from '../../services/file.service';
import { Exam, Subject, Topic, QandA } from '../../shared/models';

@Component({
  selector: 'app-edit-qandas',
  templateUrl: './edit-qandas.component.html',
  styleUrls: ['./edit-qandas.component.css'],
})
export class EditQandasComponent implements OnInit {
  form!: FormGroup;
  canClose = true;
  exam$!: Observable<Exam[]>;
  subject$!: Observable<Subject[]>;
  topic$!: Observable<Topic[]>;
  currqanda!: QandA;

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '60vh',
    minHeight: '0',
    maxHeight: 'auto',
    width: '80vw',
    minWidth: '0',
    translate: 'no',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter Question / Marking Scheme here...',
    defaultFontName: 'Arial',
  };

  constructor(
    private dialogRef: MatDialogRef<EditQandasComponent>,
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
      question: [this.currqanda.question, Validators.required],
      answer: [this.currqanda.answer, Validators.required],
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

  get question() {
    return this.form.controls['question'];
  }

  get answer() {
    return this.form.controls['answer'];
  }

  get marks() {
    return this.form.controls['marks'];
  }
}
