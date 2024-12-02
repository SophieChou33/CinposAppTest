import {
  Component,
  inject,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
  Input,
  Output,
  SimpleChanges,
  EventEmitter,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'click-modal-center',
  templateUrl: './click-modal-center.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./click-modal-center.component.css'],
})
export class ClickModalCenter {
  @ViewChild('content') contentTemplate!: TemplateRef<any>;
  private modalService = inject(NgbModal);
  @Input() clickModalCenterParams: any;
  @Input() activeModal: boolean = false;
  @Output() activeModalChange = new EventEmitter<boolean>();

  parseParams: {
    titleParam: string;
    contentParam: any;
    buttonParam: string;
    close: string;
  } = {
    titleParam: '',
    contentParam: {},
    buttonParam: '',
    close: '',
  };
  // google map loc info
  locationObj: { lat: number; lng: number } = {
    lat: 24,
    lng: 121,
  };

  timeFormat(time: any) {
    const formatedTime = new Date(time).toLocaleString('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    return formatedTime;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activeModal'] && !changes['activeModal'].firstChange) {
      setTimeout(() => {
        if (this.activeModal) {
          this.openVerticallyCentered(this.contentTemplate);
          this.activeModal = false;
          this.activeModalChange.emit(this.activeModal);
        }
      });
    }
    if (
      changes['clickModalCenterParams'] &&
      Object.keys(this.clickModalCenterParams).length > 0
    ) {
      const contentParam = this.clickModalCenterParams.contentParam;
      // Datatable 傳入資料
      let formatObsTime = this.timeFormat(contentParam.ObsTime.DateTime);
      let formatLowTempTime = this.timeFormat(
        contentParam.WeatherElement.DailyExtreme.DailyLow.TemperatureInfo
          .Occurred_at.DateTime
      );
      let formatHighTempTime = this.timeFormat(
        contentParam.WeatherElement.DailyExtreme.DailyHigh.TemperatureInfo
          .Occurred_at.DateTime
      );
      // 傳到 google component 的資料
      formatObsTime = !formatObsTime ? '' : formatObsTime;
      formatLowTempTime = !formatLowTempTime ? '' : formatLowTempTime;
      formatHighTempTime = !formatHighTempTime ? '' : formatHighTempTime;

      // 解析完成的資料：parseParams
      let parseContents = contentParam;
      parseContents.ObsTime.DateTime = formatObsTime;
      parseContents.WeatherElement.DailyExtreme.DailyLow.TemperatureInfo.Occurred_at.DateTime =
        formatLowTempTime;
      parseContents.WeatherElement.DailyExtreme.DailyHigh.TemperatureInfo.Occurred_at.DateTime =
        formatHighTempTime;
      this.parseParams = {
        titleParam: this.clickModalCenterParams.titleParam,
        contentParam: parseContents,
        buttonParam: this.clickModalCenterParams.buttonParam,
        close: this.clickModalCenterParams.close,
      };
      this.locationObj = {
        lat: this.parseParams.contentParam.GeoInfo.Coordinates[0]
          .StationLatitude,
        lng: this.parseParams.contentParam.GeoInfo.Coordinates[0]
          .StationLongitude,
      };
    }
  }

  openVerticallyCentered(content: TemplateRef<any>) {
    this.modalService.open(content, { centered: true, size: 'xl' });
  }
  activeModalF() {
    this.activeModal = false;
  }
  activeModalT() {
    this.activeModal = true;
  }
}
