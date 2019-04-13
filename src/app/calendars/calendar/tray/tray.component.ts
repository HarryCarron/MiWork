import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-tray',
  templateUrl: './tray.component.html',
  styleUrls: ['./tray.component.css']
})
export class TrayComponent implements OnInit {

  constructor() { }

  @Input() dayData: any;

  public hoursOfDay: Array<any> = [];
  public dateInfo: any;

  private makeHoursOfDayMetadata (): Array<any> {
        const output: Array<any> = [];

        for (let i = 8; i <= 17; i++) {
            output.push({
                value: i + ':00'
            });
            output.push({
                value: i + ':30'
            });
        }
    return output;
  }

    ngOnInit() {
        this.hoursOfDay = this.makeHoursOfDayMetadata();
    }

    ngOnChanges() {
        if (this.dayData) {
            console.log(this.dayData);
            this.dateInfo = this.dayData.string;
        }
        this.hoursOfDay = this.makeHoursOfDayMetadata();
    }

}
