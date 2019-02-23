import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as moment from 'moment';

import { AppComponent } from './app.component';
import { DaysOfTheWeek } from './calendar/metadata/enums/calendarEnums';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarCellComponent } from './calendar/calendar-cell/calendar-cell.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolBarComponent } from './calendar/tool-bar/tool-bar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MaterialModule } from './material';
import { SideBarComponent } from './side-bar/side-bar.component';
import { HeaderBarComponent } from './header-bar/header-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    CalendarCellComponent,
    ToolBarComponent,
    SideBarComponent,
    HeaderBarComponent
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
