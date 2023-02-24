import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { StatisticsCurrentComponent } from './components/statistics-current/statistics-current.component';
import { StatisticsPreviousComponent } from './components/statistics-previous/statistics-previous.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { ExamStartComponent } from './components/exam-start/exam-start.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"about",component:AboutComponent},
  {path:"login",component:LoginComponent},
  {path:"StatisticsCurrent",component:StatisticsCurrentComponent},
  {path:"StatisticsPrevious",component:StatisticsPreviousComponent},
  {path:"create-user",component:CreateUserComponent},
  {path:"exam-start",component:ExamStartComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes),RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }


