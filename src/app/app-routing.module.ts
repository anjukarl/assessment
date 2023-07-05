import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UnivsComponent } from './components/univs/univs.component';
import { ExamsComponent } from './components/exams/exams.component';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { TopicsComponent } from './components/topics/topics.component';
import { QandasComponent } from './components/qandas/qandas.component';
import { AssessmentsComponent } from './components/assessments/assessments.component';
import { LoginComponent } from './components/login/login.component';
import { GuardService } from './services/guard.service';

const routes: Routes = [
  { path: 'univs', component: UnivsComponent, canActivate: [GuardService] },
  { path: 'exams', component: ExamsComponent, canActivate: [GuardService] },
  {
    path: 'subjects',
    component: SubjectsComponent,
    canActivate: [GuardService],
  },
  { path: 'topics', component: TopicsComponent, canActivate: [GuardService] },
  {
    path: 'questions',
    component: QandasComponent,
    canActivate: [GuardService],
  },
  {
    path: 'assessments',
    component: AssessmentsComponent,
    canActivate: [GuardService],
  },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
