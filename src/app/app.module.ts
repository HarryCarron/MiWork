import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as moment from 'moment';

import { AppComponent } from './app.component';
import { CalendarComponent } from './calendars/calendar/calendar.component';

import { CalendarCellComponent } from './calendars/calendar/calendar-cell/calendar-cell.component';
import { ToolBarComponent } from './calendars/calendar/tool-bar/tool-bar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MaterialModule } from './material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SideBarComponent } from './side-bar/side-bar.component';
import { HeaderBarComponent } from './header-bar/header-bar.component';
import { CalendarConfig } from './calendars/metadata/calendarConfig';
import { TrayComponent } from './calendars/calendar/tray/tray.component';
import { CalendarService } from './calendars/calendar/calendar.service';

import {MatSidenavModule} from '@angular/material/sidenav';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    CalendarCellComponent,
    ToolBarComponent,
    SideBarComponent,
    HeaderBarComponent,
    CalendarComponent,
    TrayComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSidenavModule
  ],
  exports: [
    MatFormFieldModule,
    MaterialModule
  ],
  providers: [CalendarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
