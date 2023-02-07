import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

import { Univ, Exam, Subject, Topic, QandA } from '../shared/models';
import { convertSnaps } from '../shared/utils';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  /*
    CRUD operations on QandAs
  */

  loadQandAs(): Observable<QandA[]> {
    return this.db
      .collection('qandas2')
      .get()
      .pipe(map((results) => convertSnaps<QandA>(results)));
  }

  deleteQandA(qandaId: string) {
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
      .collection('topics')
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
      .collection('subjects', (ref) => ref.orderBy('subject_code'))
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
