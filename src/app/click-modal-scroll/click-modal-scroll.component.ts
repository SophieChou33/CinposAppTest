import { Component, inject, TemplateRef, ViewEncapsulation, Input } from '@angular/core';
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
		titleParam: '預設 title (scroll modal)',
		contentParam: `'預設 content (scroll modal)'`,
		buttonParam: '預設 button (scroll modal)',
		close: '預設 close button (scroll modal)'
	}

	openScrollableContent(longContent: any) {
		this.modalService.open(longContent, { scrollable: true });
	}
}