import { Component, Input } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';
import { LazyImageComponent } from "../../../shared/components/lazy-image/lazy-image.component";

@Component({
    selector: 'gifs-card',
    standalone: true,
    templateUrl: './card.component.html',
    styleUrl: './card.component.css',
    imports: [LazyImageComponent]
})
export class CardComponent {

  @Input()
  public gif!: Gif;

  ngOnInit():void{
    if(!this.gif) throw new Error("GIF is required");
  }
}
