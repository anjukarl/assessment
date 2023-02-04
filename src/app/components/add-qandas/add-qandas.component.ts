import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Observable } from 'rxjs';

import { FileService } from '../../services/file.service';
import { Exam, Subject, Topic, QandA } from '../../shared/models';

@Component({
  selector: 'app-add-qandas',
  templateUrl: './add-qandas.component.html',
  styleUrls: ['./add-qandas.component.css'],
})
export class AddQandasComponent implements OnInit {
  form!: FormGroup;
  canClose = true;
  exam$!: Observable<Exam[]>;
  subject$!: Observable<Subject[]>;
  topic$!: Observable<Topic[]>;

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
    private dialogRef: MatDialogRef<AddQandasComponent>,
    private fb: FormBuilder,
    private fileService: FileService
  ) {
    this.form = this.fb.group({
      exam: ['', Validators.required],
      subject: ['', Validators.required],
      topic: [''],
      year: ['', Validators.required],
      question: ['', Validators.required],
      answer: ['', Validators.required],
      marks: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.exam$ = this.fileService.loadExams();
    this.subject$ = this.fileService.loadSubjects();
    this.topic$ = this.fileService.loadTopics();
  }

  save() {
    this.saveQandAInfo();
    this.dialogRef.close();
  }

  cancel() {
    this.dialogRef.close();
  }

  saveQandAInfo() {
    let newQandA: Partial<QandA> = {};
    newQandA.exam_name = this.form.value.exam;
    newQandA.subject_name = this.form.value.subject;
    newQandA.topic_code = this.form.value.topic ? this.form.value.topic : '';
    newQandA.year = this.form.value.year;
    newQandA.question = this.form.value.question;
    newQandA.answer = this.form.value.answer;
    newQandA.marks = +this.form.value.marks;

    this.fileService.createQandA(newQandA);
  }

  get exam() {
    return this.form.controls['exam'];
  }

  get subject() {
    return this.form.controls['subject'];
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
