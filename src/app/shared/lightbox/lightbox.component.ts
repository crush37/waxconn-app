import { Component, Input, OnInit } from '@angular/core';
import { Gallery, GalleryItem, ImageItem } from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';

@Component({
  selector: 'app-lightbox',
  templateUrl: './lightbox.component.html'
})
export class LightboxComponent implements OnInit {
  items: GalleryItem[] = [];
  @Input() imageData: { src: string, thumb: string }[] = [];
  @Input() thumbSize?: string;
  @Input() classes: string = '';

  constructor(public gallery: Gallery, public lightbox: Lightbox) {
  }

  ngOnInit(): void {
    if (this.imageData.length === 0) {
      const img = 'assets/default-placeholder.png';
      this.imageData.push({ src: img, thumb: img });
    }
    this.items = this.imageData.map(item => new ImageItem({ src: item.src, thumb: item.thumb }));
    const lightboxRef = this.gallery.ref('lightbox');
    lightboxRef.load(this.items);
  }

}
