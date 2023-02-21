import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialogRef,
  MatDialog,
  MatDialogConfig,
} from '@angular/material/dialog';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { FileService } from '../../services/file.service';
import { Exam, Subject, Topic, QandA, Assessment } from '../../shared/models';
import { ViewQuestionsComponent } from '../view-questions/view-questions.component';

@Component({
  selector: 'app-add-assessments',
  templateUrl: './add-assessments.component.html',
  styleUrls: ['./add-assessments.component.css'],
})
export class AddAssessmentsComponent implements OnInit {
  form!: FormGroup;
  canClose = false;
  exam$!: Observable<Exam[]>;
  subject$!: Observable<Subject[]>;
  topic$!: Observable<Topic[]>;
  qanda$!: Observable<QandA[]>;
  assessmentUrl = '';
  assessmentFile = '';
  totalMarks = 0;
  qandA: QandA[] = [];
  subjectSubscription: Subscription = new Subscription();
  examSubscription: Subscription = new Subscription();
  topicSubscription: Subscription = new Subscription();
  questionSubscription: Subscription = new Subscription();

  constructor(
    private dialogRef: MatDialogRef<AddAssessmentsComponent>,
    private fb: FormBuilder,
    private fileService: FileService,
    private dialog: MatDialog,
    private storage: AngularFireStorage
  ) {
    this.form = this.fb.group({
      exam: ['', Validators.required],
      subject: ['', Validators.required],
      topics: ['', { validators: Validators.required, updateOn: 'blur' }],
      questions: ['', { validators: Validators.required, updateOn: 'blur' }],
      asid: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.exam$ = this.fileService.loadExams();
  }

  onQuestionsChange(): void {
    this.questionSubscription = this.form
      .get('questions')!
      .valueChanges.subscribe((ques) => {
        this.totalMarks = 0;
        this.qandA = ques;
        this.qandA.forEach((item: any) => {
          this.totalMarks += item.marks;
        });
      });
  }

  onTopicsChange(): void {
    this.topicSubscription = this.form
      .get('topics')!
      .valueChanges.subscribe((tops) => {
        this.qanda$ = this.fileService.loadQandAsForTopics(tops);
      });
  }

  onSubChange(): void {
    this.subjectSubscription = this.form
      .get('subject')!
      .valueChanges.subscribe((subj) => {
        this.topic$ = this.fileService.loadTopicsForSubject(subj);
      });
  }

  onExamChange(): void {
    this.examSubscription = this.form
      .get('exam')!
      .valueChanges.subscribe((exam) => {
        this.subject$ = this.fileService.loadSubjectsForExam(exam);
      });
  }

  ngOnDestroy() {
    if (this.subjectSubscription) {
      this.subjectSubscription.unsubscribe();
    }

    if (this.examSubscription) {
      this.examSubscription.unsubscribe();
    }

    if (this.topicSubscription) {
      this.topicSubscription.unsubscribe();
    }

    if (this.questionSubscription) {
      this.questionSubscription.unsubscribe();
    }
  }

  save() {
    this.saveAssessmentInfo();
    this.dialogRef.close();
  }

  cancel() {
    this.dialogRef.close();
  }

  view(qandas: QandA[]) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '80%';
    dialogConfig.data = qandas;

    this.dialog
      .open(ViewQuestionsComponent, dialogConfig)
      .afterClosed()
      .subscribe(() => {});
  }

  saveAssessmentInfo() {}

  get exam() {
    return this.form.controls['exam'];
  }

  get subject() {
    return this.form.controls['subject'];
  }

  get topics() {
    return this.form.controls['topics'];
  }

  get questions() {
    return this.form.controls['questions'];
  }

  get asid() {
    return this.form.controls['asid'];
  }
}
