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