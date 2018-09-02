import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  @Input() imagesUrl: string[];
  @Input() imageHeight: any;
  @Input() slideIndicator: any;

  myInterval = 3000;
  activeSlideIndex = 0;
  noWrapSlides = false;
  showIndicator = false;
  noPause = true;
  height = '700px';
  images: any;

  constructor() {
  }

  ngOnInit() {
     this.images = this.imagesUrl;
     this.height = this.imageHeight;
     this.showIndicator = this.slideIndicator;
  }

}
