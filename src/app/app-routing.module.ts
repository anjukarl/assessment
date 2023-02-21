import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UnivsComponent } from './components/univs/univs.component';
import { ExamsComponent } from './components/exams/exams.component';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { TopicsComponent } from './components/topics/topics.component';
import { QandasComponent } from './components/qandas/qandas.component';
import { AssessmentsComponent } from './components/assessments/assessments.component';

const routes: Routes = [
  { path: 'univs', component: UnivsComponent },
  { path: 'exams', component: ExamsComponent },
  { path: 'subjects', component: SubjectsComponent },
  { path: 'topics', component: TopicsComponent },
  { path: 'questions', component: QandasComponent },
  { path: 'assessments', component: AssessmentsComponent },
  { path: '', redirectTo: '/assessments', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
