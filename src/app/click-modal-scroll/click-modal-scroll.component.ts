import { Component, inject, ViewEncapsulation, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'click-modal-scroll',
	templateUrl: './click-modal-scroll.component.html',
	encapsulation: ViewEncapsulation.None,
	styleUrls: ['./click-modal-scroll.component.css'],
})
export class ClickModalScroll {
	private modalService = inject(NgbModal);
	@Input() clickModalScrollParams:{titleParam: string, contentParam: string, buttonParam: string, close: string} = {
		titleParam: '',
		contentParam: '',
		buttonParam: '',
		close: ''
	}

	openScrollableContent(longContent: any) {
		this.modalService.open(longContent, { scrollable: true });
	}
}