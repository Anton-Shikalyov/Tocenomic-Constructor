import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-block-template',
  templateUrl: './block-template.component.html',
  styleUrls: ['./block-template.component.css']
})

export class BlockTemplateComponent {
  @Input() data: any;
  showBlock: boolean = true;

  ngOnChanges() {
    this.showBlock = this.data;
  }
}
