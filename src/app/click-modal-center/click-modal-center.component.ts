import { Component, inject, TemplateRef,ViewChild, ViewEncapsulation, Input, Output, SimpleChanges, EventEmitter } from '@angular/core';
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
	@Input() clickModalCenterParams:{titleParam: string, contentParam: string, buttonParam: string, close: string} = {
		titleParam: '預設 title (center modal)',
		contentParam: '預設 content (center modal)',
		buttonParam: '預設 button (center modal)',
		close: '預設 close button (center modal)'
	}
	@Input() activeModal: boolean=false;
	@Output() activeModalChange = new EventEmitter<boolean>();
	
	parseParams: { 
		titleParam: string, 
		contentParam: any,
		buttonParam: string, 
		close: string 
	  } = {
		titleParam: '',
		contentParam: {},
		buttonParam: '',
		close: ''
	  };
	timeFormat(time:any){
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
			  console.log(this.activeModal);
			  this.activeModalChange.emit(this.activeModal);
			}
		  });
		}
		if (changes['clickModalCenterParams']&&this.clickModalCenterParams) {
			const formatObsTime = this.timeFormat(JSON.parse(this.clickModalCenterParams.contentParam).ObsTime.DateTime);

			const formatLowTempTime = this.timeFormat(JSON.parse(this.clickModalCenterParams.contentParam).WeatherElement.DailyExtreme.DailyLow.TemperatureInfo.Occurred_at.DateTime);
			const formatHighTempTime = this.timeFormat(JSON.parse(this.clickModalCenterParams.contentParam).WeatherElement.DailyExtreme.DailyHigh.TemperatureInfo.Occurred_at.DateTime);

			let parseContents = JSON.parse(this.clickModalCenterParams.contentParam)
			parseContents.ObsTime.DateTime = formatObsTime;
			parseContents.WeatherElement.DailyExtreme.DailyLow.TemperatureInfo.Occurred_at.DateTime = formatLowTempTime;
			parseContents.WeatherElement.DailyExtreme.DailyHigh.TemperatureInfo.Occurred_at.DateTime = formatHighTempTime;
			this.parseParams = {
			  titleParam: this.clickModalCenterParams.titleParam,
			  contentParam: parseContents,  // Assuming contentParam is a JSON string
			  buttonParam: this.clickModalCenterParams.buttonParam,
			  close: this.clickModalCenterParams.close
			};
			console.log(this.parseParams);
		  }
		  console.log(this.parseParams);
	  }
	  
	
	openVerticallyCentered(content: TemplateRef<any>) {
		this.modalService.open(content, { centered: true, size: 'xl' });
	}
	activeModalF(){
		this.activeModal=false;
		console.log(this.activeModal);
	}
	activeModalT(){
		this.activeModal=true;
		console.log(this.activeModal);
	}
}