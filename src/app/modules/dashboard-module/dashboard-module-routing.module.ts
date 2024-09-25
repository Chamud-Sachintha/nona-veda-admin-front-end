import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { QuizManagementComponent } from './quiz-management/quiz-management.component';
import { QuizResultsComponent } from './quiz-results/quiz-results.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  {
    path: 'home',
    component: HomeComponent
  },

  {
    path: 'admin-users',
    component: AdminUsersComponent
  },

  {
    path: 'quiz-management',
    component: QuizManagementComponent
  },

  {
    path: 'results',
    component: QuizResultsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardModuleRoutingModule { }
