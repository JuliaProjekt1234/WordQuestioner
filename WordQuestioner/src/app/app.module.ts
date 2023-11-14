import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { BarButtonComponent } from './components/side-bar/bar-button/bar-button.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AddLessonComponent } from './components/lesson/add-lesson/add-lesson.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ColoPickerComponent } from './components/color-picker-button/color-picker.component';
import { WordTranslationsComponent } from './components/lesson/add-lesson/word-translations/word-translations.component';
import { MaterialModule } from 'src/modules/material-modules.module';
import { MyLessonsComponent } from './components/lesson/my-lessons/my-lesson.component';
import { ErrorInterceptor } from './interceptor/error-interceptor';
import { LoginComponent } from './components/authentyfication/login/login.component';
import { RegistrationComponent } from './components/authentyfication/registration/registration.component';
import { LessonInfoComponent } from './components/lesson/my-lessons/lesson-info/lesson-info-component';
import { LessonSearchComponent } from './components/lesson/my-lessons/lesson-search/lesson-search.component';


@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    BarButtonComponent,
    AddLessonComponent,
    ColoPickerComponent,
    WordTranslationsComponent,
    MyLessonsComponent,
    LoginComponent,
    RegistrationComponent,
    LessonInfoComponent,
    LessonSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
