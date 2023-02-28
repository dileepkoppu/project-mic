import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { StatisticsCurrentComponent } from './components/statistics-current/statistics-current.component';
import { StatisticsPreviousComponent } from './components/statistics-previous/statistics-previous.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { ExamStartComponent } from './components/exam-start/exam-start.component';
import { ExamListComponent } from './components/exam-list/exam-list.component';
import { CreateExamComponent } from './components/create-exam/create-exam.component';
import { CreateQuestionComponent } from './components/create-question/create-question.component';
import { QuestionComponent } from './components/question/question.component';
import { ResultComponent } from './components/result/result.component';


const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"about",component:AboutComponent},
  {path:"login",component:LoginComponent},
  {path:"StatisticsCurrent",component:StatisticsCurrentComponent},
  {path:"StatisticsPrevious",component:StatisticsPreviousComponent},
  {path:"create-user",component:CreateUserComponent},
  {path:"create-exam",component:CreateExamComponent},
  {path:"exam-list",component:ExamListComponent},
  {path:"exam-list/:id",component:ExamStartComponent},
  {path:"exam-list/:id/:q_s/:q_id",component:QuestionComponent},
  {path:"exam-list/:id/addquestion",component:CreateQuestionComponent},
  {path:"result/:exam_session",component:ResultComponent},
  { path: '**', redirectTo: '/'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes),RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }


