import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularEditorModule } from '@kolkov/angular-editor';

import {
  AppComponent,
  TrustHtmlPipe,
  TrustResourceUrlPipe,
} from './app.component';
import { environment } from '../environments/environment';
import { UnivsComponent } from './components/univs/univs.component';
import { AddUnivsComponent } from './components/add-univs/add-univs.component';
import { EditUnivsComponent } from './components/edit-univs/edit-univs.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ExamsComponent } from './components/exams/exams.component';
import { AddExamsComponent } from './components/add-exams/add-exams.component';
import { EditExamsComponent } from './components/edit-exams/edit-exams.component';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { AddSubjectsComponent } from './components/add-subjects/add-subjects.component';
import { EditSubjectsComponent } from './components/edit-subjects/edit-subjects.component';
import { TopicsComponent } from './components/topics/topics.component';
import { AddTopicsComponent } from './components/add-topics/add-topics.component';
import { EditTopicsComponent } from './components/edit-topics/edit-topics.component';
import { QandasComponent } from './components/qandas/qandas.component';
import { AddQandasComponent } from './components/add-qandas/add-qandas.component';
import { EditQandasComponent } from './components/edit-qandas/edit-qandas.component';
import { ViewQandasComponent } from './components/view-qandas/view-qandas.component';
import { AddQandas2Component } from './components/add-qandas2/add-qandas2.component';
import { EditQandas2Component } from './components/edit-qandas2/edit-qandas2.component';
import { AssessmentsComponent } from './components/assessments/assessments.component';
import { AddAssessmentsComponent } from './components/add-assessments/add-assessments.component';
import { ViewAssessmentsComponent } from './components/view-assessments/view-assessments.component';
import { ViewQuestionsComponent } from './components/view-questions/view-questions.component';
import { LoginComponent } from './components/login/login.component';
import { GuardService } from './services/guard.service';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    UnivsComponent,
    AddUnivsComponent,
    EditUnivsComponent,
    ConfirmDialogComponent,
    ExamsComponent,
    AddExamsComponent,
    EditExamsComponent,
    SubjectsComponent,
    AddSubjectsComponent,
    EditSubjectsComponent,
    TopicsComponent,
    AddTopicsComponent,
    EditTopicsComponent,
    QandasComponent,
    AddQandasComponent,
    EditQandasComponent,
    TrustHtmlPipe,
    TrustResourceUrlPipe,
    ViewQandasComponent,
    AddQandas2Component,
    EditQandas2Component,
    AssessmentsComponent,
    AddAssessmentsComponent,
    ViewAssessmentsComponent,
    ViewQuestionsComponent,
    LoginComponent,
  ],
  imports: [
    AngularEditorModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFireAuthModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [GuardService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
