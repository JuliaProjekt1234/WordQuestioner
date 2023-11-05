import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { BarButtonComponent } from './components/side-bar/bar-button/bar-button.component';
import { HttpClientModule } from '@angular/common/http';
import { AddLessonComponent } from './components/lesson/add-lesson/add-lesson.component';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { ColoPickerComponent } from './components/lesson/add-lesson/color-picker-button/color-picker.component';
import { MatMenuModule } from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { WordTranslationsComponent } from './components/lesson/add-lesson/word-translations/word-translations.component';


@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    BarButtonComponent,
    AddLessonComponent,
    ColoPickerComponent,
    WordTranslationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatIconModule,
    HttpClientModule,
    MatInputModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatSelectModule,
    MatSnackBarModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
