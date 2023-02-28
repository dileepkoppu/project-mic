import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { StatisticsCurrentComponent } from './components/statistics-current/statistics-current.component';
import { StatisticsPreviousComponent } from './components/statistics-previous/statistics-previous.component';
import { AboutComponent } from './components/about/about.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ExamStartComponent } from './components/exam-start/exam-start.component';
import { ExamListComponent } from './components/exam-list/exam-list.component';
import { CreateExamComponent } from './components/create-exam/create-exam.component';
import { CreateQuestionComponent } from './components/create-question/create-question.component';
import { QuestionComponent } from './components/question/question.component';
import { ResultComponent } from './components/result/result.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    StatisticsCurrentComponent,
    StatisticsPreviousComponent,
    AboutComponent,
    CreateUserComponent,
    ExamStartComponent,
    ExamListComponent,
    CreateExamComponent,
    CreateQuestionComponent,
    QuestionComponent,
    ResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
