import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as moment from 'moment';

import { AppComponent } from './app.component';
import { CalendarComponent } from './calendars/calendar/calendar.component';
import { Calendar2Component } from './calendars/calendar2/calendar2.component';

import { CalendarCellComponent } from './calendars/calendar/calendar-cell/calendar-cell.component';
import { ToolBarComponent } from './calendars/calendar/tool-bar/tool-bar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MaterialModule } from './material';
import { SideBarComponent } from './side-bar/side-bar.component';
import { HeaderBarComponent } from './header-bar/header-bar.component';
import { CalendarConfig } from './calendars/metadata/calendarConfig';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    CalendarCellComponent,
    ToolBarComponent,
    SideBarComponent,
    HeaderBarComponent,
    CalendarComponent,
    Calendar2Component
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    MatFormFieldModule
  ],
  exports: [
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
