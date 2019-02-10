import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as moment from 'moment';

import { AppComponent } from './app.component';
import { DaysOfTheWeek } from './calendar/metadata/enums/calendarEnums';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarCellComponent } from './calendar/calendar-cell/calendar-cell.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    CalendarCellComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
