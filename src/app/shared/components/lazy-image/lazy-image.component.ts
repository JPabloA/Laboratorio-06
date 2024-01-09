import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lazy-image.component.html',
  styleUrl: './lazy-image.component.css'
})
export class LazyImageComponent {

  @Input()
  public url!: string;

  @Input()
  public alt: string = '';

  public hasLoaded: boolean = false;

  onLoad():void{
    this.hasLoaded = true;
  }

  ngOnInit():void{
    if(!this.url) throw new Error('Url is required');
  }
}
