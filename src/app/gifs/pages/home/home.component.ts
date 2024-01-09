import { Component } from '@angular/core';
import { SearchBoxComponent } from "../../components/search-box/search-box.component";
import { CardListComponent } from "../../components/card-list/card-list.component";
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gifs.interfaces';
import { PaginationComponent } from "../../components/pagination/pagination.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [SearchBoxComponent, CardListComponent, PaginationComponent]
})
export class HomeComponent {

  constructor(private gifsService: GifsService){}

  get gifs(): Gif[]{
    return this.gifsService.gifList;
  }

  get offset(): number {
    return this.gifsService.offset;
  }

  get endOffset() : number {
    return this.gifsService.endOffset;
  }

  get totalResults(): number {
    return this.gifsService.totalResults;
  }

}
