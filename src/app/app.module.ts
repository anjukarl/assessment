import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { AppComponent } from './app.component';
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
  ],
  imports: [
    AngularEditorModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
