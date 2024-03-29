import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { FileService } from '../../services/file.service';
import { Exam, Subject, Topic, QandA } from '../../shared/models';

@Component({
  selector: 'app-add-qandas2',
  templateUrl: './add-qandas2.component.html',
  styleUrls: ['./add-qandas2.component.css'],
})
export class AddQandas2Component implements OnInit {
  form!: FormGroup;
  percentageChanges$!: Observable<number>;
  canClose = false;
  exam$!: Observable<Exam[]>;
  subject$!: Observable<Subject[]>;
  topic$!: Observable<Topic[]>;
  questionUrl = '';
  answerUrl = '';
  questionFile = '';
  answerFile = '';
  currentExam = '';
  subjectSubscription: Subscription = new Subscription();
  examSubscription: Subscription = new Subscription();

  constructor(
    private dialogRef: MatDialogRef<AddQandas2Component>,
    private fb: FormBuilder,
    private fileService: FileService,
    private storage: AngularFireStorage
  ) {
    this.form = this.fb.group({
      exam: ['', Validators.required],
      subject: ['', Validators.required],
      topic: [''],
      year: ['', Validators.required],
      marks: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.exam$ = this.fileService.loadExams();
  }

  onSubChange(): void {
    this.subjectSubscription = this.form
      .get('subject')!
      .valueChanges.subscribe((subj) => {
        const subject = subj;
        this.topic$ = this.fileService.loadTopicsForSubject(
          subject,
          this.currentExam
        );
      });
  }

  onExamChange(): void {
    this.examSubscription = this.form
      .get('exam')!
      .valueChanges.subscribe((exam) => {
        this.currentExam = exam;
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
  }

  save() {
    this.saveQandAInfo();
    this.dialogRef.close();
  }

  cancel() {
    this.dialogRef.close();
  }

  uploadQFile(event: any) {
    const file = event.target.files[0];
    this.canClose = false;
    this.questionFile = file.name;
    this.questionFile = this.questionFile
      .split('.')
      .join('-' + Date.now() + '.');
    const filePath = `/qandas/${this.questionFile}`;

    const storageRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    this.percentageChanges$ = task.percentageChanges() as Observable<number>;

    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe((downloadUrl) => {
            this.questionUrl = downloadUrl;
          });
        })
      )
      .subscribe();
  }

  uploadAFile(event: any) {
    const file = event.target.files[0];
    this.canClose = false;
    this.answerFile = file.name;
    this.answerFile = this.answerFile.split('.').join('-' + Date.now() + '.');
    const filePath = `/qandas/${this.answerFile}`;

    const storageRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    this.percentageChanges$ = task.percentageChanges() as Observable<number>;

    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe((downloadUrl) => {
            this.answerUrl = downloadUrl;
            this.canClose = true;
          });
        })
      )
      .subscribe();
  }

  saveQandAInfo() {
    let newQandA: Partial<QandA> = {};
    newQandA.exam_name = this.form.value.exam;
    newQandA.subject_name = this.form.value.subject;
    newQandA.topic_code = this.form.value.topic ? this.form.value.topic : '';
    newQandA.year = this.form.value.year;
    newQandA.marks = +this.form.value.marks;
    newQandA.q_filename = this.questionFile;
    newQandA.a_filename = this.answerFile;
    newQandA.q_url = this.questionUrl;
    newQandA.a_url = this.answerUrl;

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

  get marks() {
    return this.form.controls['marks'];
  }
}
