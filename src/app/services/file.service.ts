import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  Univ,
  Exam,
  Subject,
  Topic,
  QandA,
  Assessment,
} from '../shared/models';
import { convertSnaps } from '../shared/utils';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private basePath1 = '/qandas';
  private basePath2 = '/assessments';
  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  /*
    CRUD operations on Assessments
  */

  loadAssessments(): Observable<Assessment[]> {
    return this.db
      .collection('assessments')
      .get()
      .pipe(map((results) => convertSnaps<Assessment>(results)));
  }

  deleteAssessment(assessmentId: string, asFile: string) {
    const storageRef = this.storage.ref(this.basePath2);
    storageRef.child(asFile).delete();
    return from(this.db.doc(`assessments/${assessmentId}`).delete());
  }

  // updateQandA(qandaId: string, changes: Partial<QandA>): Observable<any> {
  //   return from(this.db.doc(`qandas2/${qandaId}`).update(changes));
  // }

  createAssessment(newAssessment: Partial<Assessment>) {
    let save$: Observable<any>;
    save$ = from(this.db.collection('assessments').add(newAssessment));
    return save$.pipe(
      map((res) => {
        return {
          id: res.id,
          ...newAssessment,
        };
      })
    );
  }

  /*
    CRUD operations on QandAs
  */

  loadQandAs(): Observable<QandA[]> {
    return this.db
      .collection('qandas2')
      .get()
      .pipe(map((results) => convertSnaps<QandA>(results)));
  }

  loadQandAsForTopics(topics: string[]): Observable<QandA[]> {
    return this.db
      .collection('qandas2', (ref) => ref.where('topic_code', 'in', topics))
      .get()
      .pipe(map((results) => convertSnaps<QandA>(results)));
  }

  deleteQandA(qandaId: string, aFile: string, qFile: string) {
    const storageRef = this.storage.ref(this.basePath1);
    storageRef.child(aFile).delete();
    storageRef.child(qFile).delete();
    return from(this.db.doc(`qandas2/${qandaId}`).delete());
  }

  updateQandA(qandaId: string, changes: Partial<QandA>): Observable<any> {
    return from(this.db.doc(`qandas2/${qandaId}`).update(changes));
  }

  createQandA(newQanda: Partial<QandA>) {
    let save$: Observable<any>;
    save$ = from(this.db.collection('qandas2').add(newQanda));
    return save$.pipe(
      map((res) => {
        return {
          id: res.id,
          ...newQanda,
        };
      })
    );
  }

  /*
    CRUD operations on Topics
  */

  loadTopics(): Observable<Topic[]> {
    return this.db
      .collection('topics', (ref) =>
        ref.orderBy('exam_name').orderBy('subject_name').orderBy('topic_name')
      )
      .get()
      .pipe(map((results) => convertSnaps<Topic>(results)));
  }

  loadTopicsForSubject(subj: string, exam?: string): Observable<Topic[]> {
    return this.db
      .collection('topics', (ref) =>
        ref
          .where('exam_name', '==', exam)
          .where('subject_name', '==', subj)
          .orderBy('topic_name')
      )
      .get()
      .pipe(map((results) => convertSnaps<Topic>(results)));
  }

  deleteTopic(topicId: string) {
    return from(this.db.doc(`topics/${topicId}`).delete());
  }

  updateTopic(topicId: string, changes: Partial<Topic>): Observable<any> {
    return from(this.db.doc(`topics/${topicId}`).update(changes));
  }

  createTopic(newTopic: Partial<Topic>) {
    let save$: Observable<any>;
    save$ = from(this.db.collection('topics').add(newTopic));
    return save$.pipe(
      map((res) => {
        return {
          id: res.id,
          ...newTopic,
        };
      })
    );
  }

  /*
    CRUD operations on Subjects
  */

  loadSubjects(): Observable<Subject[]> {
    return this.db
      .collection('subjects', (ref) =>
        ref.orderBy('exam_name').orderBy('subject_name')
      )
      .get()
      .pipe(map((results) => convertSnaps<Subject>(results)));
  }

  loadSubjectsForExam(exam: string): Observable<Subject[]> {
    return this.db
      .collection('subjects', (ref) =>
        ref.where('exam_name', '==', exam).orderBy('subject_name')
      )
      .get()
      .pipe(map((results) => convertSnaps<Subject>(results)));
  }

  deleteSubject(subjectId: string) {
    return from(this.db.doc(`subjects/${subjectId}`).delete());
  }

  updateSubject(subjectId: string, changes: Partial<Subject>): Observable<any> {
    return from(this.db.doc(`subjects/${subjectId}`).update(changes));
  }

  createSubject(newSubject: Partial<Subject>) {
    let save$: Observable<any>;
    save$ = from(this.db.collection('subjects').add(newSubject));
    return save$.pipe(
      map((res) => {
        return {
          id: res.id,
          ...newSubject,
        };
      })
    );
  }

  /*
    CRUD operations on Universities
  */

  loadUnivs(): Observable<Univ[]> {
    return this.db
      .collection('univs')
      .get()
      .pipe(map((results) => convertSnaps<Univ>(results)));
  }

  deleteUniv(univId: string) {
    return from(this.db.doc(`univs/${univId}`).delete());
  }

  updateUniv(univId: string, changes: Partial<Univ>): Observable<any> {
    return from(this.db.doc(`univs/${univId}`).update(changes));
  }

  createUniv(newUniv: Partial<Univ>) {
    let save$: Observable<any>;
    save$ = from(this.db.collection('univs').add(newUniv));
    return save$.pipe(
      map((res) => {
        return {
          id: res.id,
          ...newUniv,
        };
      })
    );
  }

  /*
    CRUD operations on Examinations
  */

  loadExams(): Observable<Exam[]> {
    return this.db
      .collection('exams')
      .get()
      .pipe(map((results) => convertSnaps<Exam>(results)));
  }

  deleteExam(examId: string) {
    return from(this.db.doc(`exams/${examId}`).delete());
  }

  updateExam(examId: string, changes: Partial<Exam>): Observable<any> {
    return from(this.db.doc(`exams/${examId}`).update(changes));
  }

  createExam(newExam: Partial<Exam>) {
    let save$: Observable<any>;
    save$ = from(this.db.collection('exams').add(newExam));
    return save$.pipe(
      map((res) => {
        return {
          id: res.id,
          ...newExam,
        };
      })
    );
  }
}
