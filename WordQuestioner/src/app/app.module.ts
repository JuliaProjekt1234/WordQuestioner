import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { BarButtonComponent } from './components/side-bar/bar-button/bar-button.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AddLessonComponent } from './components/lesson/add-lesson/add-lesson.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ColoPickerComponent } from './components/lesson/add-lesson/color-picker-button/color-picker.component';
import { WordTranslationsComponent } from './components/lesson/add-lesson/word-translations/word-translations.component';
import { MaterialModule } from 'src/modules/material-modules.module';
import { MyLessonsComponent } from './components/lesson/my-lessons/my-lesson.component';
import { ErrorInterceptor } from './interceptor/error-interceptor';


@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    BarButtonComponent,
    AddLessonComponent,
    ColoPickerComponent,
    WordTranslationsComponent,
    MyLessonsComponent
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
